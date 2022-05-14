import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  UsersAPI } from '../../API-AXIOS/api';
import {  setUsers, setUsersCount } from '../../Redux/Slices/usersSlice';
import PageSlider from './PageSlider';
import s from './Users.module.css';




const Users =(props)=>{

   const dispatch = useDispatch()
   const users = useSelector(state=>state.users.users);
   const pageSize = useSelector(state=>state.users.pageSize);
   const pageNumb = useSelector(state=>state.users.pageNumb);
   const userPhoto = useSelector(state=>state.users.userPhoto);
   const [error, setError] = useState('');
   

   
  //запрос на сервер за пользователями 
   useEffect(()=>{
      // fetch(`https://social-network.samuraijs.com/api/1.0/users?count=${pageSize}&page=${pageNumb}`)
      // .then(response => response.json())
      // .then(json => { dispatch(setUsers(json.items)); dispatch(setUsersCount(json.totalCount))})
      UsersAPI.getUsers(pageSize,pageNumb).then(response=>{
         dispatch(setUsers(response.data.items));
         dispatch(setUsersCount(response.data.totalCount))
      })
      
   },[dispatch, pageSize, pageNumb ])
   useEffect(()=>{
      // UsersAPI.follow(23975).then(response=>{
      //    console.log(response)
      // }).catch(function (error) {
      //    setError(error);
      // })
   },[])
   return(
      <div className={s.usersBlock}>
         {error.message}
         <PageSlider  dispatch={dispatch} pageNumb={pageNumb} />
         <div className={s.users}>
         {users.map(u=><div className={s.user} key={u.id}>
            <p>{u.id}</p>
            <Link to={'/profile/'+u.id}>
            <img src={u.photos.small ? u.photos.small: userPhoto} alt='avatar' width={150}/>
            </Link>
            
            <span>{u.name} </span> 
            {u.followed ? <button onClick={()=>{UsersAPI.unfollow(u.id)}} >отписаться</button> 
                        : <button onClick={()=>{UsersAPI.follow(u.id)}} >подписаться</button> }
            <p></p>
            {u.status ? <p>status: {u.status}</p> : null}
         </div>)}
         </div>
           
      </div>
   )
}

export default Users;