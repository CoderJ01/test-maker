// React
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// CSS
import './App.css';

// components
import Header from './components/Header/Header.component';
import Register from './components/Register/Register.component';
import Login from './components/Login/Login.component';

// pages
import Home from './pages/Home/Home.page';

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
  console.log(user);
  
  return (
    <div className='App'>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
