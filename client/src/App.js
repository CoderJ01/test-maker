// React
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// CSS
import './App.css';

// component
import Header from './components/Header/Header.component';
import Register from './components/Register/Register.component';
import Login from './components/Login/Login.component';

// pages
import Home from './pages/Home/Home.page';

function App() {
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
