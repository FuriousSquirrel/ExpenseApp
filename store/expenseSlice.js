import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
	name: "expenses",
	initialState: {
		allExpenses: [],
	},
	reducers: {
		addExpense: (state, action) => {
			state.allExpenses.push(action.payload);
		},
		setExpenses: (state, action) => {
			state.allExpenses = action.payload;
		},
		deleteExpense: (state, action) => {
			state.allExpenses = state.allExpenses.filter(
				(expense) => expense.id !== action.payload
			);
		},
		updateExpense: (state, action) => {
			const { payload } = action;
			const currentItem = state.allExpenses.find((expense) => {
				return expense.id === payload.id;
			});
			const index = state.allExpenses.indexOf(currentItem);
			const updatedItem = {
				id: payload.id,
				description: payload.info.description,
				amount: payload.info.amount,
				date: payload.info.date,
			};
			state.allExpenses[index] = updatedItem;
		},
	},
});

export const { addExpense, deleteExpense, updateExpense, setExpenses } =
	expenseSlice.actions;

export default expenseSlice.reducer;
