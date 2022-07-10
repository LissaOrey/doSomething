import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useRedirect } from '../../Hooks/useRedirect';
import { changePageNumb, fetchUsers, follow, unfollow, setUsersCount } from '../../Redux/Slices/usersSlice';
import Paginator from '../utils/Paginator/Paginator2';
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
   const userPhoto = useSelector(state => state.users.userPhoto);
   const followingStatus = useSelector(state => state.users.followingStatus);
   const followingInProgress = useSelector(state => state.users.followingInProgress);

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
   console.log('render')
   return (
      <div className={s.usersBlock}>

         {error}
         {/* <PageSlider  dispatch={dispatch} pageNumb={pageNumb} /> */}
         {usersCount <= pageSize ? undefined : <Paginator currentPage={pageNumb} setCurrentPage={changePageNumb} itemsTotalCount={usersCount} pageSize={pageSize} />}

         {fetchStatus === 'loading' ? <h4>Loading...</h4> :
            <div className={s.users}>
               {users.map(u => <div className={s.user} key={u.id}>
                  {/* <p>{u.id}</p> */}
                  {/* <hr /> */}
                  <Link to={'/profile/' + u.id}>
                     <img src={u.photos.small ? u.photos.small : userPhoto} alt='avatar' width={150} />
                  </Link>
                  <Link to={'/profile/' + u.id}>
                     <p>{u.name} </p>            
                  </Link>
                  <hr />
                  {u.followed && isAuth && <button disabled={followingInProgress.some(item => item === u.id)}
                     onClick={() => { dispatch(unfollow(u.id)) }} > {followingStatus === 'loading' && followingInProgress.some(item => item === u.id) ? 'LOADING...' : 'unfollow'}
                  </button>}
                  {!u.followed && isAuth && <button disabled={followingInProgress.some(item => item === u.id)}
                        onClick={() => { dispatch(follow(u.id)) }} >{followingStatus === 'loading' && followingInProgress.some(item => item === u.id) ? 'LOADING...' : 'follow'}
                     </button>
                  }
                  {/* {u.followed ? <button disabled={followingInProgress.some(item => item === u.id)}
                     onClick={() => { dispatch(unfollow(u.id)) }} > {followingStatus === 'loading' && followingInProgress.some(item => item === u.id) ? 'LOADING...' : 'unfollow'}
                  </button>
                     : <button disabled={followingInProgress.some(item => item === u.id)}
                        onClick={() => { dispatch(follow(u.id)) }} >{followingStatus === 'loading' && followingInProgress.some(item => item === u.id) ? 'LOADING...' : 'follow'}
                     </button>
                  } */}
                  {u.status ? <p>status: {u.status}</p> : null}
               </div>)}
            </div>}

      </div>
   )
}

export default Users;