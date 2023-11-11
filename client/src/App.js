// React
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// CSS
import './App.css';

// components
import Header from './components/Header/Header.component';
import Register from './components/Register/Register.component';
import Login from './components/Login/Login.component';
import AccessDenied from './components/AccessDenied/AccessDenied.component';

// pages
import Home from './pages/Home/Home.page';
import CreateTest from './pages/CreateTest/CreateTest.page';
import CreateQuestions from './pages/CreateQuestions/CreateQuestions.page';
import ViewTest from './pages/ViewTest/ViewTest.page';
import TakeTest from './pages/TakeTest/TakeTest.page';
import Update from './pages/Update/Update.page';

// util
import { baseURL } from './utils/urls';
import { prohibitAccess } from './utils/prohibitAccess';

// other imports
import axios from 'axios';
import cookie from 'js-cookie';

function App() {
  const [user, setUser] = useState([]);
 
  useEffect(() => {
    const fetchUser = async() => {
      try {
        let userCookie = cookie.get('test-maker-cookie');
        const response = await axios.get(`${baseURL}/api/users`);
        for(let i = 0; i < response.data.length; i++) {
          if(response.data[i].random_string === userCookie) {
            setUser(response.data[i]);
          }
        }
      }
      catch(error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className='App'>
      <Header user={user}/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={prohibitAccess(user) === false ? <Home user={user}/> : <Navigate to='/register'/>}/>
          <Route path='/register' element={prohibitAccess(user) ? <Register/> : <Navigate to='/'/>}/>
          <Route path='/login' element={prohibitAccess(user) ? <Login/> : <Navigate to='/'/>}/>
          <Route path='/create-test' element={prohibitAccess(user) ? <AccessDenied/> : <CreateTest user={user}/>}/>
          <Route path='/create-questions' element={prohibitAccess(user) ? <AccessDenied/> : <CreateQuestions user={user}/>}/>
          <Route path='/view-test/:userId/:testId' element={prohibitAccess(user) ? <AccessDenied/> : <ViewTest user={user}/>}/>
          <Route path='/take-test/:testId' element={prohibitAccess(user) ? <AccessDenied/> : <TakeTest user={user}/>}/>
          <Route path='/update-info' element={prohibitAccess(user) ? <AccessDenied/> : <Update user={user}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
