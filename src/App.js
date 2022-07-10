import './App.css';
import GameContainer from './Components/Game/GameContainer';
import Users from './Components/Users/Users';
import Profile from './Components/Profile/Profile';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { authMe } from './Redux/Slices/authSlice';
import { useEffect } from 'react';
// import UsersWithScroll from './Components/Users/UsersWithScroll';
// import ProfileForm from './Components/Profile/ProfileForm';

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
          <Route path='/' element={<Home />}  />
          <Route path='profile'>
            <Route path='' element={<Profile />} />
            <Route path=':id' element={<Profile />} />
          </Route>
          {/* <Route path='users' element={<UsersWithScroll />}  /> */}
          <Route path='users' element={<Users  isFriend='undefined' withPaginator={true}/>}  />
          <Route path='friends' element={<Users  isFriend='true' withPaginator={false} />}  />
          <Route path='game' element={<GameContainer />}  />
          <Route path='login' element={<Login />}  />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
