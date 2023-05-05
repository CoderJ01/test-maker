// React
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// CSS
import './App.css';

// component
import Header from './components/Header/Header.component';

// pages
import Home from './pages/Home/Home.page';

function App() {
  return (
    <div className='App'>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
