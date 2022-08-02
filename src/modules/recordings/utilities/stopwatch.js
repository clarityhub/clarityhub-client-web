export default function toStopwatch(milliseconds) {
	const HOUR = 60 * 60 * 1000;
	const MINUTES = 60 * 1000;

	var hours = Math.floor(milliseconds / HOUR);
	var m = Math.floor((milliseconds - (hours * HOUR)) / MINUTES);
	var s = Math.floor(milliseconds % MINUTES / 1000);

	const mm = m > 9 ? m : '0' + m;
	const ss = s > 9 ? s : '0' + s;

	if (hours) {
		return `${hours}:${mm}:${ss}`;
	}

	return `${m}:${ss}`;
}
