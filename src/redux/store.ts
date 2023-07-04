import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';

export interface ExpenseState {
	name: string;
	value: number;
	type: 'credit' | 'debit';
	category: 'food' | 'transport' | 'shopping' | 'other';
}

export const slice = createSlice({
	name: 'app',
	initialState: {
		value: {
			previousBalance: 1000,
			expenses: [] as Array<ExpenseState>,
		},
	},
	reducers: {
		updateExpense: (state, action: PayloadAction<ExpenseState>) => {
			state.value = {
				...state.value,
				expenses: [...state.value.expenses, action.payload],
			};
		},
	},
});

export const store = configureStore({
	reducer: {
		slice: slice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const a = {};
