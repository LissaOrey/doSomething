import './App.css';
import Game from './Components/Game/Game';
import Users from './Components/Users/Users';
import Profile from './Components/Profile/Profile';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';

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
          </Route>
          <Route path='users' element={<Users />}  />
          <Route path='game' element={<Game />}  />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
