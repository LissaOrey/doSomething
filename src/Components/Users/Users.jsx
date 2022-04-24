import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UsersAPI } from '../../API-AXIOS/api';
import {  changePageNumb, setUsers, setUsersCount } from '../../Redux/Slices/usersSlice';
import s from './Users.module.css';




const Users =(props)=>{

   const users = useSelector(state=>state.users.users);
   const usersCount = useSelector(state=>state.users.usersCount);
   const pageSize = useSelector(state=>state.users.pageSize);
   const pageNumb = useSelector(state=>state.users.pageNumb);
   const userPhoto = useSelector(state=>state.users.userPhoto);
   const dispatch = useDispatch()

   let pageCount = Math.ceil(usersCount/pageSize);
   let pages = [];
   for (let i = 1; i <= pageCount; i++) {
      pages[i-1]= {id: i, v: i}
   }
   
   useEffect(()=>{
      // fetch('https://jsonplaceholder.typicode.com/users/')
      //    .then(response => response.json())
      //    .then(json => dispatch(setUsers(json)))
      // fetch(`https://social-network.samuraijs.com/api/1.0/users?count=${pageSize}&page=${pageNumb}`)
      // .then(response => response.json())
      // .then(json => { dispatch(setUsers(json.items)); dispatch(setUsersCount(json.totalCount))})
      UsersAPI.getUsers(pageSize,pageNumb).then(response=>{
         dispatch(setUsers(response.data.items));
         dispatch(setUsersCount(response.data.totalCount))
      })
   },[dispatch, pageSize, pageNumb ])


   return(
      <div className={s.usersBlock}>
         <div className={s.pages}>
         {pages.map(p=> <span className={Number(pageNumb)===p.v ? s.selectedPage : undefined} key={p.id} onClick={(e)=>dispatch(changePageNumb(e.currentTarget.innerText))} >{p.v}  </span>)}
         </div>
         <div className={s.users}>
         {users.map(u=><div className={s.user} key={u.id}>
            <img src={u.photos.small ? u.photos.small: userPhoto} alt='avatar' width={150}/>
            <span>{u.name} </span> <button>{u.followed ? 'отписаться' : 'подписаться'}</button> <br/>
            {u.status ? <p>status: {u.status}</p> : null}
         </div>)}
         </div>
           
      </div>
   )
}

export default Users;