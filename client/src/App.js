// React
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// CSS
import './App.css';

// components
import Header from './components/Header/Header.component';
import Register from './components/Register/Register.component';
import Login from './components/Login/Login.component';

// pages
import Home from './pages/Home/Home.page';
import CreateTest from './pages/CreateTest/CreateTest.page';
import CreateQuestions from './pages/CreateQuestions/CreateQuestions.page';
import ViewTest from './pages/ViewTest/ViewTest.page';


// util
import { baseURL } from './utils/urls';

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
          <Route path='/' element={user.length !== 0 ? <Home user={user}/> : <Navigate to='/register'/>}/>
          <Route path='/register' element={user.length === 0 ? <Register/> : <Navigate to='/'/>}/>
          <Route path='/login' element={user.length === 0 ? <Login/> : <Navigate to='/'/>}/>
          <Route path='/create-test/:userId' element={user.length !== 0 ? <CreateTest/> : <Navigate to='/register'/>}/>
          <Route path='/create-questions/:userId' element={<CreateQuestions/>}/>
          <Route path='/view-test/:userId/:testId' element={<ViewTest/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
