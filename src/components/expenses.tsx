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
				flex: 1,
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
			}}>
			<div style={{ marginTop: '30px' }}>Previous Balance : {initialValue}</div>

			{expenses.map((expense, index) => {
				return (
					<div
						style={{
							marginTop: '10px',
							marginBottom: '10px',
							width: 300,
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'column',
							backgroundColor: '#88888833',
							borderRadius: '10px',
							position: 'relative',
						}}
						key={index}>
						<div
							style={{ position: 'absolute', top: '10px', right: '10px' }}
							onClick={() => {
								navigator.clipboard.writeText(JSON.stringify(expense));
							}}>
							<p style={{ margin: '0px', cursor: 'pointer' }}>Share</p>
						</div>
						<p style={{ fontSize: '22px' }}>{expense.name}</p>

						<div
							style={{
								width: '100%',
								display: 'flex',
								alignItems: 'center',
								flexDirection: 'row',
								justifyContent: 'space-around',
							}}>
							<div
								style={{
									padding: '5px',
									borderRadius: '5px',
									border: '1px solid black',
								}}>
								{expense.category}
							</div>
							<p
								style={{
									padding: '5px',
									borderRadius: '5px',
									backgroundColor:
										expense.type === 'credit' ? '#00811180' : '#ff5d5d80',
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
