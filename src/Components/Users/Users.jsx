import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  Navigate } from 'react-router-dom';
import { changePageNumb, setUsersCount } from '../../Redux/Slices/usersSlice';
import { fetchUsers } from '../../Redux/Slices/usersAsyncThunks';
import Paginator from '../utils/Paginator/Paginator2';
import User from './User';
// import PageSlider from './../utils/Paginator/PageSlider';
import s from './Users.module.css';




const Users = ({ isFriend }) => {

   const authToggle = useSelector(state => state.auth.authToggle);
   const isAuth = useSelector(state => state.auth.isAuth);

   const dispatch = useDispatch()
   const usersCount = useSelector(state => state.users.usersCount);
   const users = useSelector(state => state.users.users);
   const error = useSelector(state => state.users.error);
   const fetchStatus = useSelector(state => state.users.fetchStatus);
   const pageSize = useSelector(state => state.users.pageSize);
   const pageNumb = useSelector(state => state.users.pageNumb);
   const followingStatus = useSelector(state => state.users.followingStatus);

   //запрос на сервер за пользователями 
   useEffect(() => {
      dispatch(fetchUsers({ pageSize, pageNumb, isFriend }))
   }, [pageSize, pageNumb, dispatch, isFriend])

   useEffect(() => {
      dispatch(changePageNumb(1));
      dispatch(setUsersCount(0));
   }, [isFriend, dispatch])

   if (!isAuth && authToggle && isFriend==='true') {
      return <Navigate to='/login' />
   }
   if (followingStatus === 'rejected') {
      alert(error)
   }

   return (
      <div className={s.usersBlock}>

         {error}
         {/* <PageSlider  dispatch={dispatch} pageNumb={pageNumb} /> */}
         {usersCount <= pageSize ? undefined : <Paginator currentPage={pageNumb} setCurrentPage={changePageNumb} itemsTotalCount={usersCount} pageSize={pageSize} />}

         {fetchStatus === 'loading' ? <h4>Loading...</h4> :
            <div className={s.users}>
               {users.map(u=><User user={u} key={u.id} isAuth={isAuth} followingStatus={followingStatus} />)}
            </div>}

      </div>
   )
}

export default Users;