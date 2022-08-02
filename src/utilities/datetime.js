export const differenceInDays = (startTime, endTime) => {
	// Take the difference between the dates and divide by milliseconds per day.
	// Round to nearest whole number to deal with DST.
	return Math.round((endTime - startTime) / (1000 * 60 * 60 * 24));
};
