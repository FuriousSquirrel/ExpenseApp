import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
	name: "expenses",
	initialState: {
		allExpenses: [
			{
				id: "e1",
				description: "A pair of shoes",
				amount: 59.99,
				date: "2022-06-13",
			},
			{
				id: "e2",
				description: "A pair of trousers",
				amount: 89.29,
				date: "2022-06-12",
			},
			{
				id: "e3",
				description: "Some bananas",
				amount: 5.99,
				date: "2022-06-08",
			},
			{
				id: "e4",
				description: "A book",
				amount: 14.99,
				date: "2022-02-19",
			},
			{
				id: "e5",
				description: "A book",
				amount: 18.59,
				date: "2022-02-18",
			},
			{
				id: "e6",
				description: "A pair of shoes",
				amount: 59.99,
				date: "2021-12-19",
			},
			{
				id: "e7",
				description: "A pair of trousers",
				amount: 89.29,
				date: "2022-01-05",
			},
			{
				id: "e8",
				description: "Some bananas",
				amount: 5.99,
				date: "2021-12-10",
			},
			{
				id: "e9",
				description: "A book",
				amount: 14.99,
				date: "2022-02-19",
			},
			{
				id: "e10",
				description: "A book",
				amount: 18.59,
				date: "2022-02-18",
			},
		],
	},
	reducers: {
		addExpense: (state, action) => {
			state.allExpenses.push(action.payload);
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

export const { addExpense, deleteExpense, updateExpense } =
	expenseSlice.actions;

export default expenseSlice.reducer;
