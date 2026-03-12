/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#fcefc7',
                    DEFAULT: '#fab123',
                    dark: '#c4891b',
                },
                amazon: {
                    blue: '#232f3e',
                    lightBlue: '#37475a',
                    yellow: '#febd69',
                }
            },
            fontFamily: {
                ember: ['Amazon Ember', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
