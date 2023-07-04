import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ExpenseState, RootState } from '../redux/store';
import { Cell, Pie, PieChart } from 'recharts';

const getValues = (expenses: ExpenseState[]) => {
	const data = ['food', 'transport', 'shopping', 'other'].map((category) => ({
		name: category,
		value: expenses
			.filter((expense) => expense.category === category)
			.reduce((previous, expense) => {
				if (expense.type === 'credit') return previous + 0;
				else return previous + expense.value;
			}, 0),
	}));

	return data;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

const Charts = () => {
	const [pieChartData, SetPieChartData] = useState<
		{ name: string; value: number }[]
	>([]);

	const expenses = useSelector(
		(state: RootState) => state.slice.value.expenses
	);

	useEffect(() => {
		SetPieChartData(getValues(expenses));
	}, [expenses]);

	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index,
	}: {
		cx: number;
		cy: number;
		midAngle: number;
		innerRadius: number;
		outerRadius: number;
		percent: number;
		index: number;
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill='white'
				textAnchor={x > cx ? 'start' : 'end'}
				dominantBaseline='central'>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};

	return (
		<div
			style={{
				flex: 1,
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
			}}>
			Expenses Split
			<PieChart width={200} height={200}>
				<Pie
					dataKey='value'
					data={pieChartData}
					cx='50%'
					cy='50%'
					labelLine={false}
					label={renderCustomizedLabel}
					outerRadius={80}
					fill='#8884d8'>
					{pieChartData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
			</PieChart>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}>
				{pieChartData.map((data, index) => (
					<div
						key={data.name}
						style={{
							flexDirection: 'row',
							display: 'flex',
							alignItems: 'center',
						}}>
						<div
							style={{
								height: '10px',
								width: '10px',
								backgroundColor: COLORS[index],
							}}
						/>{' '}
						<p style={{ margin: '5px' }}>
							{data.name} : {data.value}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Charts;
