import { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import {
	deleteExpense,
	updateExpense,
	addExpense,
} from "../store/expenseSlice";
import { useSelector, useDispatch } from "react-redux";
import ExpenseForm from "../components/Manage Expense/ExpenseForm";
import { storeExpense, updateExpenseAPI, deleteExpenseAPI } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function ManageExpense({ route, navigation }) {
	const [error, setError] = useState();
	const [isSubmitting, setIsSubmitting] = useState();
	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;
	const dispatch = useDispatch();
	const selectedExpense = useSelector((state) =>
		state.expenses.allExpenses.find((expense) => expense.id === editedExpenseId)
	);
	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? "Edit Expense" : "Add Expense",
		});
	}, [navigation, isEditing]);

	async function deleteExpenseHandler() {
		setIsSubmitting(true);
		try {
			await deleteExpenseAPI(editedExpenseId);
			dispatch(deleteExpense(editedExpenseId));
			navigation.goBack();
		} catch (error) {
			setIsSubmitting(false);
			setError("Unable to delete expense!");
		}
	}

	function cancelHandler() {
		navigation.goBack();
	}

	async function confirmHandler(expenseData) {
		try {
			if (isEditing) {
				setIsSubmitting(true);
				await updateExpenseAPI(editedExpenseId, expenseData);
				dispatch(
					updateExpense({
						id: editedExpenseId,
						info: expenseData,
					})
				);
			} else {
				setIsSubmitting(true);

				const id = await storeExpense(expenseData);
				dispatch(
					addExpense({
						id: id,
						...expenseData,
					})
				);
			}
			navigation.goBack();
		} catch (error) {
			setIsSubmitting(false);
			setError("Could not save expense!");
			return;
		}
	}

	function errorHandler() {
		setError(null);
	}

	if (error && !isSubmitting) {
		return <ErrorOverlay message={error} onConfirm={errorHandler} />;
	}

	if (isSubmitting) {
		return <LoadingOverlay />;
	}

	return (
		<View style={styles.container}>
			<ExpenseForm
				submitButtonLabel={isEditing ? "Update" : "Add"}
				onSubmit={confirmHandler}
				onCancel={cancelHandler}
				defaultValues={selectedExpense}
			/>

			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon='trash'
						color={GlobalStyles.colors.error500}
						size={36}
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 25,
		backgroundColor: GlobalStyles.colors.primary800,
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: "center",
	},
});
