import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { slice } from '../redux/store';

const InputForm = () => {
	const [name, setName] = useState('');
	const [value, setValue] = useState(0);
	const [type, setType] = useState<'credit' | 'debit'>('credit');
	const [category, setCategory] = useState<
		'food' | 'transport' | 'shopping' | 'other'
	>('other');

	const dispatch = useDispatch();

	const {
		actions: { updateExpense },
	} = slice;

	const submitHandler = () => {
		dispatch(updateExpense({ name, value, type, category }));
	};

	return (
		<div
			style={{
				width: '100%',
				alignItems: 'center',
				flexDirection: 'column',
			}}>
			<form onSubmit={submitHandler} action='#'>
				<div
					style={{
						width: '100%',
						alignItems: 'center',
						flexDirection: 'column',
						display: 'flex',
					}}>
					<span>
						<label htmlFor='name'>Name: </label>
						<input
							id='name'
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</span>
					<span>
						<label htmlFor='value'>Value: </label>
						<input
							id='value'
							type='number'
							value={value}
							onChange={(e) => setValue(+e.target.value)}
						/>
					</span>
					<select
						value={type}
						onChange={(e) => setType(e.target.value as 'credit' | 'debit')}>
						<option value={'credit'}>Credit</option>
						<option value={'debit'}>Debit</option>
					</select>

					<select
						value={category}
						onChange={(e) =>
							setCategory(
								e.target.value as 'food' | 'transport' | 'shopping' | 'other'
							)
						}>
						<option value={'food'}>Food</option>
						<option value={'transport'}>Transport</option>
						<option value={'shopping'}>Shopping</option>
						<option value={'other'}>Other</option>
					</select>

					<button type='submit'>Submit</button>
				</div>
			</form>
		</div>
	);
};

export default InputForm;
