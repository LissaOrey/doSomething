import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  UsersAPI } from '../../API-AXIOS/api';
import {  changePageNumb, fetchUsers, setFetching, updateUser } from '../../Redux/Slices/usersSlice';
import Paginator from '../utils/Paginator/Paginator2';
// import PageSlider from './../utils/Paginator/PageSlider';
import s from './Users.module.css';




const Users =({isFriend})=>{

   const dispatch = useDispatch()
   const usersCount = useSelector(state=>state.users.usersCount);
   const users = useSelector(state=>state.users.users);
   const error = useSelector(state=>state.users.error);
   const status = useSelector(state=>state.users.status);
   const pageSize = useSelector(state=>state.users.pageSize);
   const pageNumb = useSelector(state=>state.users.pageNumb);
   const userPhoto = useSelector(state=>state.users.userPhoto);
   const [followingInProgress, setFollowingInProgress] = useState([]);
   
   
  //запрос на сервер за пользователями 
   useEffect(()=>{
      dispatch(fetchUsers({pageSize,pageNumb,isFriend}))
   },[ pageSize, pageNumb,dispatch,isFriend])

   function addIdInFollowingInProgressArray(id) {
      let copy = [...followingInProgress];
      copy.push(id)
      setFollowingInProgress(copy)
   }

   function deleteIdInFollowingInProgressArray(id) {
      let copy = followingInProgress.filter(item=>item.id!==id)
      setFollowingInProgress(copy)
   }

   return(
      <div className={s.usersBlock}>
         {status==='loading' && <h3>Loading...</h3>}
         {error}
         {/* <PageSlider  dispatch={dispatch} pageNumb={pageNumb} /> */}
         {usersCount <= pageSize ? undefined :<Paginator currentPage={pageNumb} setCurrentPage={changePageNumb} itemsTotalCount={usersCount} pageSize={pageSize} />}
         
         <div className={s.users}>
         {users.map(u=><div className={s.user} key={u.id}>
            <p>{u.id}</p>
            <Link to={'/profile/'+u.id}>
            <span>{u.name} </span>            </Link>
            <Link to={'/profile/'+u.id}>
            <img src={u.photos.small ? u.photos.small: userPhoto} alt='avatar' width={150}/>
            </Link>
             
            {u.followed ? <button disabled={followingInProgress.some(item=>item===u.id)} 
                                 onClick={()=>{
                                       addIdInFollowingInProgressArray(u.id)
                                       UsersAPI.unfollow(u.id).then((response)=>{
                                          if(response.data.resultCode===0){
                                             dispatch(updateUser(u.id))
                                          }
                                          deleteIdInFollowingInProgressArray(u.id)
                                       })
                                 }} >отписаться
                           </button> 
                        : <button disabled={followingInProgress.some(item=>item===u.id)} 
                                 onClick={()=>{
                                    addIdInFollowingInProgressArray(u.id)
                                    UsersAPI.follow(u.id).then(response=>{
                                       if(response.data.resultCode===0){
                                          dispatch(updateUser(u.id))
                                       }
                                       deleteIdInFollowingInProgressArray(u.id)
                                    })
                                 }} >подписаться
                           </button> 
            }
            <p></p>
            {u.status ? <p>status: {u.status}</p> : null}
         </div>)}
         </div>
           
      </div>
   )
}

export default Users;