/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "hsl(202, 100%, 50%)",
				primaryDark: "hsl(202, 100%, 20%)",
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
