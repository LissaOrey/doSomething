import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileAPI } from '../../API-AXIOS/api';
import s from './Profile.module.css';


const Profile =(props)=>{
   let match = useParams();
   const [id, setId] = useState(match.id)
   const [error, setError] = useState()

   if(!id){
      setId(11181)
   }
   useEffect(()=>{
      ProfileAPI.getProfile(id).then(response=>{
         console.log(response.data)
      }).catch(function (error) {
         setError(error);
       })  
   },[id])

   return(
    <div className={s.profile}>
       {error ? <div>{error.message}</div> : <div>Profile</div>}
       
   </div>
   )
}
export default Profile;