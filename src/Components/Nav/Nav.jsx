import React from 'react';
import { Link } from 'react-router-dom';
import s from './Nav.module.css';

const Nav =(props)=>{
   return(
    <div className={s.nav}>
       <nav>
          <div><Link to='/'>Home</Link></div>
          <div><Link to='/profile'>Profile</Link></div>
          <div><Link to='/users'>Users</Link></div>
          <div><Link to='/friends'>Friends</Link></div>
          <div><Link to='/game'>Game 2048</Link></div>
       </nav>
    </div>
   )
}
export default Nav;