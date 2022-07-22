import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import s from './Users.module.css';
import {  follow, unfollow } from '../../Redux/Slices/usersAsyncThunks';
import { Link } from 'react-router-dom';



const User = ({user,isAuth,followingStatus} ) => {
   const dispatch = useDispatch();
   const userPhoto = useSelector(state => state.users.userPhoto);
   const followingInProgress = useSelector(state => state.users.followingInProgress);
   // const followingStatus = useSelector(state => state.users.followingStatus);   
   return (
      <div className={s.user} key={user.id}>
                  <Link to={'/profile/' + user.id}>
                     <img className={s.avatar} src={user.photos.small ? user.photos.small : userPhoto} alt='avatar' />
                  </Link>
                  <Link to={'/profile/' + user.id}>
                     <p>{user.name} </p>            
                  </Link>
                  <hr />
                  {user.followed && isAuth && <button disabled={followingInProgress.some(item => item === user.id)}
                     onClick={() => { dispatch(unfollow(user.id)) }} > {followingStatus === 'loading' && followingInProgress.some(item => item === user.id) ? 'LOADING...' : 'unfollow'}
                  </button>}
                  {!user.followed && isAuth && <button disabled={followingInProgress.some(item => item === user.id)}
                        onClick={() => { dispatch(follow(user.id)) }} >{followingStatus === 'loading' && followingInProgress.some(item => item === user.id) ? 'LOADING...' : 'follow'}
                     </button>
                  }
                  {user.status ? <p>status: {user.status}</p> : null}
      </div>)

}

export default User;