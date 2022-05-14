import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { ProfileAPI } from '../../API-AXIOS/api';
import { setProfile, setStatus } from '../../Redux/Slices/profileSlice';
import s from './Profile.module.css';
import avatar from './../Users/small.jpg';


const Profile = (props) => {
   let params = useParams();
   const [userId, setUserId] = useState(params.id);
   const myId = useSelector(state=>state.auth.id);
   const toggle = useSelector(state=>state.auth.toggle);
   const isAuth = useSelector(state=>state.auth.isAuth);
   const [error, setError] = useState();
   const dispatch = useDispatch();
   const profile = useSelector(state => state.profile.profile)
   const status = useSelector(state => state.profile.status)
   let pc = profile ? profile.contacts : null;

   if (!userId && myId) {
      setUserId(myId)
   }

   useEffect(() => {
      if (toggle) {
         dispatch(setProfile(null))
         ProfileAPI.getProfile(userId).then(response => {
            dispatch(setProfile(response.data))
         }).catch(function (error) {
            setError(error);
         })
         ProfileAPI.getStatus(userId).then(response=>{
            dispatch(setStatus(response.data))
         })
      }
      
   }, [userId, dispatch, toggle])


   function allObjKeysIsNull(object) {
      let a = 0;
      for (const key in object) {
         if (object[key] === null) {
            a = a + 1
         }
      }
      if (Object.keys(object).length === a) {
         return false
      }
      return true
   }
   if(!isAuth && toggle){
      return <Navigate to='/login' />
   }
   if (!profile) {
      return error ? <div>Error: {error.message}</div> : <div>Loading...</div> 
   }
   return (
      <div className={s.profile}>
         {error ? <div>{error.message}</div>
            : <div>
               {profile.fullName ? <div>name: {profile.fullName}</div> : undefined}
               {profile.userId === myId ? <div>{status}</div> : <div>status: {status}</div>}
               {profile.photos.large ? <div><img src={profile.photos.large} alt='' /></div> : <div><img src={avatar} alt='avatar' /></div>}
               {profile.aboutMe ? <div>about me: {profile.aboutMe}</div> : undefined}
               {profile.lookingForAJob ? <div>looking for a job: yes</div> : undefined}
               {profile.lookingForAJobDescription ? <div>looking for a job description: {profile.lookingForAJobDescription}</div> : undefined}
               {allObjKeysIsNull(pc) ? <div>contacts:
                  <ul>
                     {pc.facebook ? <li>facebook: {pc.facebook}</li> : undefined}
                     {pc.github ? <li>github: {pc.github}</li> : undefined}
                     {pc.instagram ? <li>instagram: {pc.instagram}</li> : undefined}
                     {pc.mainLink ? <li>mainLink: {pc.mainLink}</li> : undefined}
                     {pc.twitter ? <li>twitter: {pc.twitter}</li> : undefined}
                     {pc.vk ? <li>vk: {pc.vk}</li> : undefined}
                     {pc.website ? <li>website: {pc.website}</li> : undefined}
                     {pc.youtube ? <li>youtube: {pc.youtube}</li> : undefined}
                  </ul>
               </div> : undefined}
            </div>}

      </div>
   )
}
export default Profile;