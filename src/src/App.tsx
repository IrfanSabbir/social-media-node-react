import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import { useRecoilState } from 'recoil';

import './App.css';

import Layout from "./container/Layout/Layout";
import Login from './container/Auth/Login';
import Signup from './container/Auth/Signup';

import { loggedInState } from "./atoms/user";

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, ] = useRecoilState(loggedInState);

 useEffect(() => {
  if(!isLoggedIn) {
    navigate('/');
  } else {
    const pathname: string = location.pathname === "/" ? "/timeline" : location.pathname;
    navigate(pathname);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <div className="App">
      <Layout>
        {
          !isLoggedIn ? 
            <Routes>
              <Route path="/signup"  element={<Signup />}/>
              <Route path="/" element={<Login />}/>   
            </Routes>
          : <Routes>
            <Route path="/timeline"  element={<div><br/><br/><br/>sadjasldj</div>}/>
          </Routes>
        }
      </Layout>
    </div>
  );
}

export default App;
