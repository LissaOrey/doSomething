import React, { useEffect,useState } from 'react';
import {  useSelector } from 'react-redux';
import {  UsersAPI } from '../../API-AXIOS/api';
import User from './User';
import s from './Users.module.css';


// доделать эту компоненту

const UsersWithScroll =(props)=>{

   const isAuth = useSelector(state => state.auth.isAuth);
   const followingStatus = useSelector(state => state.users.followingStatus);
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
            {users.map(u=><User user={u} key={u.id} isAuth={isAuth} followingStatus={followingStatus} />)}
         </div>
           
      </div>
   )
}

export default UsersWithScroll;