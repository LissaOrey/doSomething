import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthAPI } from '../../API-AXIOS/api';
import { auth,authMe, setToggle } from '../../Redux/Slices/authSlice';
import {Link} from 'react-router-dom';
import s from './Header.module.css';

const Header =(props)=>{
   const dispatch = useDispatch();
   const authlogin = useSelector(state=>state.auth.login);
   const isAuth = useSelector(state=>state.auth.isAuth);

   useEffect(()=>{
      authMe(dispatch)
   },[dispatch])
   
   function logout(){
      AuthAPI.logout().then(response=>{
         if(response.data.resultCode===0){
            dispatch(auth(false))
         }
      })
   }
   return(
    <div className={s.header}>
       {/* <button></button> */}
       {isAuth ? <div><span>{authlogin}</span><button onClick={logout}>log out</button></div>
               :<Link to='login'>log in</Link>}
    </div>
   )
}
export default Header;