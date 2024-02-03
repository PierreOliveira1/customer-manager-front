/** @type {import('tailwindcss').Config} */
import preline from 'preline/plugin';
import form from '@tailwindcss/forms';

export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'node_modules/preline/dist/*.js',
	],
	theme: {
		extend: {},
		fontFamily: {
			poppins: ['Poppins'],
		},
	},
	plugins: [preline, form],
};
