import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AuthAPI } from '../../API-AXIOS/api';
import { authMe } from '../../Redux/Slices/authSlice';

const Login =(props)=>{
   const dispatch = useDispatch();
   const [errorMessage, setErrorMessage]=useState('');
   const isAuth = useSelector(state=>state.auth.isAuth)
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
      AuthAPI.login(data.email,data.password, data.rememberMe).then(response=>{
         if(response.data.resultCode===0){
            authMe(dispatch)
         }
         setErrorMessage(response.data.messages[0])
   })
   reset()
  } 
  if(isAuth) return <Navigate replace to='/profile' /> 
  if(errorMessage!=='') alert(errorMessage)
   return(
   <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div><label>e-mail
         <input {...register('email', {
            // required: true ,
            required: 'поле обязательно к заполнению',
            minLength: {
               value: 5,
               message: 'minimum  5 symbols'
            }
         })} />
         </label></div>
         {errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}
         <div>
         <label>password
         <input {...register('password', {
            // required: true 
            required: 'поле обязательно к заполнению',
            minLength: {
               value: 5,
               message: 'minimum  5 symbols'
            }
         })} />
         </label></div>
         {errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}
         <input type={'checkbox'} {...register('rememberMe', {})} />
         <input type="submit" disabled={!isValid}/>
      </form>
   </div>
   )
}
export default Login;