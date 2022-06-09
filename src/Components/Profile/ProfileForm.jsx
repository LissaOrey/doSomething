import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileAPI } from '../../API-AXIOS/api';


const ProfileForm = (props) => {
   const dispatch = useDispatch();
   const profile = useSelector(state => state.profile.profile)



   const [contactsList, setContactsList] = useState([{ id: 1, n: 'facebook' }, { id: 2, n: 'github' }, { id: 3, n: 'instagram' }, { id: 4, n: 'mainLink' }, { id: 5, n: 'twitter' }, { id: 6, n: 'vk' }, { id: 7, n: 'website' }, { id: 8, n: 'youtube' }]);

   const {
      register,
      handleSubmit,
      watch, 
      formState: { errors, isValid },
      reset
   } = useForm({
      mode: 'onBlur'
   });
   const onSubmit = data => {
      console.log(data)

      data.fullName = data.fullName === '' ? profile.fullName : data.fullName;
      data.aboutMe = data.aboutMe === '' ? profile.aboutMe : data.aboutMe;
      data.lookingForAJobDescription = data.lookingForAJobDescription === '' ? profile.lookingForAJobDescription : data.lookingForAJobDescription;
      data.lookingForAJob = data.lookingForAJob !== profile.lookingForAJob ? data.lookingForAJob : profile.lookingForAJob;

      let dataContacts = {
         facebook: data.facebook === '' ? null : data.facebook,
         github: data.github === '' ? null : data.github,
         instagram: data.instagram === '' ? null : data.instagram,
         mainLink: data.mainLink === '' ? null : data.mainLink,
         twitter: data.twitter === '' ? null : data.twitter,
         vk: data.vk === '' ? null : data.vk,
         website: data.website === '' ? null : data.website,
         youtube: data.youtube === '' ? null : data.youtube,
      }
      if (JSON.stringify(dataContacts) === JSON.stringify(profile.contacts)
         && data.fullName === profile.fullName
         && data.aboutMe === profile.aboutMe
         && data.lookingForAJobDescription === profile.lookingForAJobDescription
         && data.lookingForAJob === profile.lookingForAJob
      ) {
         props.setShowProfileUpdate(false)
      } else {
         ProfileAPI.updateProfile(data.aboutMe, data.lookingForAJob, data.lookingForAJobDescription, data.fullName, dataContacts).then(response => {
            if (response.data.resultCode === 0) {
               props.setShowProfileUpdate(false);
               props.setIsProfileUpdate(true)
               // console.log('0')

            } else if (response.data.resultCode === 1) {
               alert(response.data.messages)
               // console.log('1')

            }
         })
      }

      reset()
   }

   return (
      <div>
         <h2>Update your profile</h2>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div><label>name
               <input {...register('fullName', {
                  required: false,
                  // required: 'поле обязательно к заполнению',
                  minLength: {
                     value: 3,
                     message: 'minimum  3 symbols'
                  }
               })} />
            </label></div>
            {errors?.name && <p>{errors?.name?.message || 'Error!'}</p>}

            <div>
               <label>aboutMe
                  <input {...register('aboutMe', {
                     required: false,
                     // required: 'поле обязательно к заполнению',
                     minLength: {
                        value: 5,
                        message: 'minimum  5 symbols'
                     }
                  })} />
               </label>
            </div>
            <div><label>lookingForAJobDescription
               <input {...register('lookingForAJobDescription', {
                  required: false,
               })} />
            </label></div>
            {errors?.lookingForAJobDescription && <p>{errors?.lookingForAJobDescription?.message || 'Error!'}</p>}
            <label>Looking for a job
               <input type={'checkbox'} {...register('lookingForAJob', {})} />
            </label>
            <div>
               <p>Contacts</p>
               {contactsList.map(c => <div key={c.id}><label>{c.n}
                  <input  {...register(c.n, {
                     required: false,
                  })} />
               </label></div>)}
            </div>
            <input type="submit" disabled={!isValid} />
         </form>
         <button onClick={()=>{props.setShowProfileUpdate(false)}}>Cancel</button>

      </div>
   )
}
export default ProfileForm;