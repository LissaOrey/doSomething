import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../../Redux/Slices/authSlice';

const Login =(props)=>{

   const dispatch = useDispatch();
   const isAuth = useSelector(state=>state.auth.isAuth);
   const captchaUrl = useSelector(state=>state.auth.captchaUrl);
   const errorMessage = useSelector(state=>state.auth.errorMessage);

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
      login(dispatch,data.email,data.password, data.rememberMe, data.captcha);
      reset()
  } 
  if(isAuth) return <Navigate replace to='/profile' /> 
//   if(errorMessage) alert(errorMessage)
   return(
   <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div><label>e-mail
         <input {...register('email', {
            // required: true,
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
         {errorMessage && <div>{errorMessage}</div>}
         <input type={'checkbox'} {...register('rememberMe', {})} />
         {captchaUrl && <img src={captchaUrl} />}
         {captchaUrl && <div><label>введите буквы из картинки <input {...register('captcha', {required: true})} /></label></div>}
         <input type="submit" 
                  // disabled={!isValid}
                  />
      </form>
   </div>
   )
}
export default Login;