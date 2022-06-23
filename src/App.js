import './App.css';
import GameContainer from './Components/Game/GameContainer';
// import Users from './Components/Users/Users';
import Profile from './Components/Profile/Profile';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import UsersWithScroll from './Components/Users/UsersWithScroll';
// import ProfileForm from './Components/Profile/ProfileForm';

function App(props) {
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
            {/* <Route path='update' element={<ProfileForm />} /> */}
          </Route>
          <Route path='users' element={<UsersWithScroll />}  />
          <Route path='game' element={<GameContainer />}  />
          <Route path='login' element={<Login />}  />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
