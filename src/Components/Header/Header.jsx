import React   from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/Slices/authSlice';
import {Link} from 'react-router-dom';
import s from './Header.module.css';

const Header =(props)=>{
   const dispatch = useDispatch();
   const authlogin = useSelector(state=>state.auth.login);
   const isAuth = useSelector(state=>state.auth.isAuth);

   return(
    <div className={s.header}>
       {isAuth ? <div><span>{authlogin}</span><button onClick={()=>logout(dispatch)}>log out</button></div>
               :<Link to='login'>log in</Link>}
    </div>
   )
}
export default Header;