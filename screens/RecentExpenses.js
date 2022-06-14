import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";
import { getDateMinusDays } from "../util/date";

export default function RecentExpenses() {
	const expensesRedux = useSelector((state) => state.expenses.allExpenses);

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
