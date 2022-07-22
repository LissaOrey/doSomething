import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  Navigate, useParams } from 'react-router-dom';
import { getProfile, savePhoto } from '../../Redux/Slices/profileAsyncThunks';
import s from './Profile.module.css';
import avatar from './../Users/small.jpg';
import Status from './Status';
import ProfileForm from './ProfileForm';
import Popup from '../Popup/Popup';

//! обработка ошибок при асинхроном коде в profileSlice

const Profile = (props) => {

   let params = useParams();
   const [userId, setUserId] = useState(params.id);
   const myId = useSelector(state => state.auth.id);
   const authToggle = useSelector(state => state.auth.authToggle);
   const isAuth = useSelector(state => state.auth.isAuth);
   const authError = useSelector(state => state.auth.error);
   const [showProfileUpdate, setShowProfileUpdate] = useState(false);
   const [isProfileUpdate, setIsProfileUpdate] = useState(false);
   const dispatch = useDispatch();
   const profile = useSelector(state => state.profile.profile);
   const status = useSelector(state => state.profile.status);
   const profileError = useSelector(state => state.profile.error);
   let pc = profile ? profile.contacts : null;


   if (!userId && myId) {
      setUserId(myId)
   }
   
   if (!params.id && userId !== myId) {
      setUserId(myId)
   }

   // if(params.id && userId=== myId){ 
   //    setUserId(params.id)
   // }
   
   useEffect(() => {

      if (isAuth && authToggle) getProfile(dispatch, userId, authToggle);

      if (isProfileUpdate){
         getProfile(dispatch, userId, authToggle);
         setIsProfileUpdate(false)
      } 

   }, [userId, dispatch, authToggle, isAuth,isProfileUpdate])


   function allObjKeysIsNull(object) {
      //если все контакты пусты, то не показываем их вовсе
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

   if (!isAuth && authToggle) {
      return <Navigate to='/login' />
   }

   if (!isAuth && !authToggle) {
      return <div>Loading</div>
   }
   if (!profile) {
      return authError  ? <div>Error: {authError }</div>
                        : <div>Loading...</div>
   }
   const onAvatarSelected =(e)=>{
      if(e.target.files.length){
         savePhoto(dispatch, e.target.files[0])
      }
   }
   return (
      <div className={s.profileContainer}>
          {profileError && <Popup text={profileError}
                                   closeSpan='x'
          />}
        
         {showProfileUpdate ? <ProfileForm setIsProfileUpdate={setIsProfileUpdate} setShowProfileUpdate={setShowProfileUpdate} /> : 
         <div className={s.profile}>
            {authError ? <div>{authError.message}</div>
               : <div>
                  {profile.userId === myId && <button onClick={()=>setShowProfileUpdate(true)} >UPDATE PROFILE</button>}
                  {profile.fullName && <div>name: {profile.fullName}</div>}
                  {profile.userId === myId
                     ? <Status />
                     : status
                        ? <div>status: {status}</div>
                        : undefined}
                  {profile.photos.large ? <div><img src={profile.photos.large} alt='avatar' /></div> : <div><img src={avatar} alt='avatar' /></div>}
                  {!params.id && <input type={'file'} onChange={onAvatarSelected} />}
                  {profile.aboutMe && <div>about me: {profile.aboutMe}</div> }
                  {profile.lookingForAJob ? <div>looking for a job: yes</div> : <div>looking for a job: no</div>}
                  {profile.lookingForAJobDescription && <div>looking for a job description: {profile.lookingForAJobDescription}</div> }
                  {allObjKeysIsNull(pc) && <div>contacts:
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
                  </div> }
               </div>}

         </div>}
      </div>

   )
}
export default Profile;