import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileAPI } from '../../API-AXIOS/api';


const ProfileForm =(props)=>{
    const dispatch = useDispatch();
    const isAuth = useSelector(state=>state.auth.isAuth);

   const contacts = useSelector(state=>state.profile.contacts);

   const { 
      register, 
      handleSubmit, 
      // watch, 
      formState: { errors, isValid } ,
      reset
   } = useForm({
      mode: 'onBlur'
   });
  const onSubmit = data => {
        ProfileAPI.updateProfile('I learn JS', true, 'frontend', 'Lisa-Orey', contacts).then(response => {
            console.log(response)
        })
     reset()
  } 
   return(
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
      <div><label>name
         <input {...register('name', {
            required: true ,
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
            // required: true 
            required: 'поле обязательно к заполнению',
            minLength: {
               value: 5,
               message: 'minimum  5 symbols'
            }
         })} />
         </label></div>
         {errors?.aboutMe && <p>{errors?.aboutMe?.message || 'Error!'}</p>}
         <input type={'checkbox'} {...register('lookingForAJob', {})} />
         <input type="submit" disabled={!isValid}/>
      </form>
    </div>
   )
}
export default ProfileForm;