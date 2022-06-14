import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";

export default function AllExpenses() {
	const expensesRedux = useSelector((state) => state.expenses.allExpenses);

	return (
		<ExpensesOutput
			expenses={expensesRedux}
			expensesPeriod='Total'
			fallbackText='No registered expenses found'
		/>
	);
}
