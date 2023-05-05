// React
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// CSS
import './App.css';

// component
import Header from './components/Header.component';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Header/>}>

					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
