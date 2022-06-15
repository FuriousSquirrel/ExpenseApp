import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector, useDispatch } from "react-redux";
import { getDateMinusDays } from "../util/date";
import { useEffect, useState } from "react";
import { fetchExpenses } from "../util/http";
import { setExpenses } from "../store/expenseSlice";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function RecentExpenses() {
	const [isFetching, setIsFetching] = useState(true);
	const [error, setError] = useState();
	const expensesRedux = useSelector((state) => state.expenses.allExpenses);
	const dispatch = useDispatch();

	useEffect(() => {
		async function getExpenses() {
			setIsFetching(true);
			try {
				const expenses = await fetchExpenses();
				dispatch(setExpenses(expenses));
			} catch (error) {
				setError("Could not fetch expenses!");
			}
			setIsFetching(false);
		}
		getExpenses();
	}, []);

	function errorHandler() {
		setError(null);
	}

	if (error && !isFetching) {
		return <ErrorOverlay message={error} onConfirm={errorHandler} />;
	}

	if (isFetching) {
		return <LoadingOverlay />;
	}

	const recentExpenses = expensesRedux.filter((expense) => {
		const today = Number(new Date());
		const date7DaysAgo = getDateMinusDays(today, 7);

		return Date.parse(expense.date) > date7DaysAgo;
	});

	return (
		<ExpensesOutput
			expenses={recentExpenses}
			expensesPeriod='Last 7 Days'
			fallbackText='No expenses registered for the last 7 days.'
		/>
	);
}
