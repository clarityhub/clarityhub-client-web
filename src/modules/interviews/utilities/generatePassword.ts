const ALPHA = 'abcdefghjkmnpqrstuvwxyz';
const UPPER = ALPHA.toUpperCase();
const NUM = '0123456789';
const SPEC = '!@#$%&+_';
const LENGTH = 10;
const PICKABLE = [
    ...ALPHA.split(''),
    ...UPPER.split(''),
    ...NUM.split(''),
    ...SPEC.split(''),
];

const pick = (arr: Array<any>) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

export default function generatePassword(): String {
    return Array(LENGTH).fill(0).map(() => pick(PICKABLE)).join('');
}