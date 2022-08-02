export const colors = [
	'#FFE3E3',
	'#FFE7D6',
	'#F0DCB9',
	'#FDEFA7',
	'#EFFFA5',
	'#D0F4A7',
	'#C7F9C9',
	'#C7F9E1',
	'#C7F9EF',
	'#C7E1F9',
	'#E3DEFB',
	'#F4EAFE',
	'#FEEAFB',
	'#E8E2E8',
];

const mod = (x, n) => (x % n + n) % n;

export default function pickColor(s) {
	// Turn text into a nice color
	let hash = 0;
	for (let i = 0; i < s.length; i++) {
		// eslint-disable-next-line no-bitwise
		hash = s.charCodeAt(i) + ((hash << 5) - hash);
	}

	return colors[mod(hash, colors.length)].substring(1);
}
