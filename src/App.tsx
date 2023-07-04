import React from 'react';
import logo from './logo.svg';
import './App.css';
import InputForm from './components/inputForm';
import Expenses from './components/expenses';
import Charts from './components/charts';

function App() {
	return (
		<div className='App'>
			<InputForm />
			<div
				style={{
					width: '100%',
					alignItems: 'center',
					justifyContent: 'space-around',
					display: 'flex',
					flexDirection: 'row',
				}}>
				<Expenses />
				<Charts />
			</div>
		</div>
	);
}

export default App;
