import './App.css';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authMe } from './Redux/Slices/authSlice';
import React, {  useEffect } from 'react';
import HomeContainer from './Components/Home/HomeContainer';
import { withSuspense } from './hoc/withSuspense';
// import UsersWithScroll from './Components/Users/UsersWithScroll';
const Profile = React.lazy(() => import('./Components/Profile/Profile'));
const ProfileComponent = withSuspense(Profile);
const UsersLazy = React.lazy(() => import('./Components/Users/Users'));
const Users = withSuspense(UsersLazy);
const GameContainer = React.lazy(() => import('./Components/Game/GameContainer'));
const Game = withSuspense(GameContainer);
const LoginLazy = React.lazy(() => import('./Components/Login/Login'));
const Login = withSuspense(LoginLazy);

function App(props) {

  const dispatch = useDispatch();
  const authToggle = useSelector(state=>state.auth.authToggle)

  useEffect(()=>{
    authMe(dispatch)
  },[dispatch])

  if(!authToggle) return <h1>Loading...</h1>
  
  return (
    <div className={"App"}>
      <Header />
      <Nav />
      <div className={'content-wrapper'}>
        
        <Routes>
          <Route path='/' element={<HomeContainer />}  />
          <Route path='profile'>
            <Route path='' element={<ProfileComponent />} />
            <Route path=':id' element={<ProfileComponent />} />
          </Route>
          {/* <Route path='users' element={<UsersWithScroll />}  /> */}
          <Route path='users' element={<Users isFriend='undefined' />}  />
          <Route path='friends' element={<Users  isFriend='true' />}  />
          <Route path='game' element={<Game />}  />
          <Route path='login' element={<Login />}  />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
