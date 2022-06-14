export function getFormattedDate(date) {
	const convertedDate = new Date(date);
	return `${convertedDate.getFullYear()}-${
		convertedDate.getUTCMonth() + 1
	}-${convertedDate.getUTCDate()}`;
}

export function getDateMinusDays(date, days) {
	return date - days * 86400000;
}
