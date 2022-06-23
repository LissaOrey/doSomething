import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ProfileAPI } from '../../API-AXIOS/api';
import { getProfile } from '../../Redux/Slices/profileSlice';
import s from './Profile.module.css';
import avatar from './../Users/small.jpg';
import Status from './Status';
import ProfileForm from './ProfileForm';
// import PhotoForm from './PhotoForm';


const Profile = (props) => {
   let params = useParams();
   const [userId, setUserId] = useState(params.id);
   const myId = useSelector(state => state.auth.id);
   const authToggle = useSelector(state => state.auth.authtToggle);
   const isAuth = useSelector(state => state.auth.isAuth);
   const [error, setError] = useState();
   const [showProfileUpdate, setShowProfileUpdate] = useState(false);
   const [isProfileUpdate, setIsProfileUpdate] = useState(false);
   const dispatch = useDispatch();
   const profile = useSelector(state => state.profile.profile)
   const status = useSelector(state => state.profile.status)
   let pc = profile ? profile.contacts : null;

   if (!userId && myId) {
      setUserId(myId)
   }
   
   if (!params.id && userId !== myId) {
      setUserId(myId)
   }

   if(params.id && userId=== myId){
      setUserId(params.id)
   }

   useEffect(() => {
      if (isAuth && authToggle) getProfile(dispatch, userId, authToggle, setError);
      if (isProfileUpdate){
         getProfile(dispatch, userId, authToggle, setError);
         setIsProfileUpdate(false)
         console.log('setIsProfileUpdate')
      } 
   }, [userId, dispatch, authToggle, isAuth,isProfileUpdate])

   useEffect(()=>{
      // ProfileAPI.updatePhoto()
   })

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
      return error ? <div>Error: {error.message}</div>
         : <div>Loading...</div>
   }
// console.log(params.id)
//       console.log(userId)
//       console.log(myId)



   return (
      <div className={s.profileContainer}>
         {showProfileUpdate ? <ProfileForm setIsProfileUpdate={setIsProfileUpdate} setShowProfileUpdate={setShowProfileUpdate} /> : 
         <div className={s.profile}>
            {error ? <div>{error.message}</div>
               : <div>
                  {profile.userId === myId && <button onClick={()=>setShowProfileUpdate(true)} >UPDATE PROFILE</button>}
                  {/* {profile.userId === myId && <Link to='/profile/update'>Profile </Link>} */}

                  {profile.fullName && <div>name: {profile.fullName}</div>}
                  {profile.userId === myId
                     ? <Status />
                     : status
                        ? <div>status: {status}</div>
                        : undefined}
                  {profile.photos.large ? <div><img src={profile.photos.large} alt='avatar' /></div> : <div><img src={avatar} alt='avatar' /></div>}
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
         <h2>PHOTO FORM</h2>
         {/* <PhotoForm /> */}
      </div>

   )
}
export default Profile;