import React from 'react';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const Expenses = () => {
	const expenses = useSelector(
		(state: RootState) => state.slice.value.expenses
	);

	const initialValue = useSelector(
		(state: RootState) => state.slice.value.previousBalance
	);

	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
			}}>
			<div style={{ marginTop: '30px' }}>Previous Balance : {initialValue}</div>

			{expenses.map((expense) => {
				return (
					<div
						style={{
							marginTop: '20px',
							marginBottom: '20px',
							width: 300,
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'column',
						}}
						key={expense.name}>
						<div>{expense.name}</div>

						<div
							style={{
								width: '100%',
								display: 'flex',
								alignItems: 'center',
								flexDirection: 'row',
								justifyContent: 'space-around',
							}}>
							{expense.category}
							<p
								style={{
									color: expense.type === 'credit' ? 'green' : 'red',
								}}>{`${expense.type === 'credit' ? '+' : '-'}${
								expense.value
							} `}</p>
						</div>
					</div>
				);
			})}

			<div style={{ marginTop: '30px' }}>
				Total Expenditure :{' '}
				{expenses.reduce((previous: number, expense) => {
					if (expense.type === 'credit') return previous + expense.value;
					else return previous - expense.value;
				}, 0)}
			</div>

			<div style={{ marginTop: '30px' }}>
				Balance :{' '}
				{expenses.reduce((previous: number, expense) => {
					if (expense.type === 'credit') return previous + expense.value;
					else return previous - expense.value;
				}, initialValue)}
			</div>
		</div>
	);
};

export default Expenses;
