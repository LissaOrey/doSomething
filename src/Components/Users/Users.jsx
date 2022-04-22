import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../../Redux/toolkit/usersSlice';
import s from './Users.module.css';




const Users =(props)=>{
   const test = useSelector(state=>state.users.test);
   const dispatch = useDispatch()
   console.log(test)
   function incrementTest() {
      dispatch(increment())
   }
   return(
      <div className={s.users}>
         <p>{test}</p>
         
         <button onClick={incrementTest}>Users</button>
      </div>
   )
}
export default Users;