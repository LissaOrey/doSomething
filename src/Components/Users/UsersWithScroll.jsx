import React, { useEffect,useState } from 'react';
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  UsersAPI } from '../../API-AXIOS/api';
import s from './Users.module.css';




const UsersWithScroll =(props)=>{

   const userPhoto = useSelector(state=>state.users.userPhoto);
   const [fetching, setFetching] = useState(true)
   const [users, setUsers] = useState([])
   const [currentPage, setCurrentPage] = useState(1)
   const [pageSize, setPageSize] = useState(50)
   const [usersTotalCount, setUsersTotalCount] = useState(0)
   const [error, setError] = useState('');
   

   
   useEffect(()=>{
      if(fetching){
         UsersAPI.getUsers(pageSize,currentPage).then(response=>{
          setUsers([...users, ...response.data.items]);
            setUsersTotalCount(response.data.totalCount);
            setCurrentPage((prevState)=>prevState+1);

         }).finally(()=>setFetching(false));
      }
   },[fetching, pageSize, currentPage, users])

   
   useEffect(()=>{
      const scrollHandler =(e)=>{
         if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight)<100 && users.length < usersTotalCount){
            setFetching(true)
         }
      }
   
      document.addEventListener('scroll', scrollHandler)
      return function(){
         document.removeEventListener('scroll', scrollHandler)
      }
   },[usersTotalCount,users])
   
   return(
      <div className={s.usersBlock}>
         {error.message}
         <div className={s.users}>
         {users.map(u=><div className={s.user} key={u.id}>
            <p>{u.id}</p>
            <Link to={'/profile/'+u.id}>
            <span>{u.name} </span>            </Link>
            <Link to={'/profile/'+u.id}>
            <img src={u.photos.small ? u.photos.small: userPhoto} alt='avatar' width={150}/>
            </Link>
             
            {u.followed ? <button onClick={()=>{UsersAPI.unfollow(u.id)}} >отписаться</button> 
                        : <button onClick={()=>{UsersAPI.follow(u.id)}} >подписаться</button> }
            <p></p>
            {u.status ? <p>status: {u.status}</p> : null}
         </div>)}
         </div>
           
      </div>
   )
}

export default UsersWithScroll;