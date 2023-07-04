import React from 'react';
import logo from './logo.svg';
import './App.css';
import InputForm from './components/inputForm';
import Expenses from './components/expenses';

function App() {
	return (
		<div className='App'>
			<InputForm />
			<Expenses />
		</div>
	);
}

export default App;
