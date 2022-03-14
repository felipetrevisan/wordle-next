module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        20: 'repeat(20, minmax(0, 1.25rem))',
        board: 'repeat(5, 4em)',
      },
      gridTemplateRows: {
        board: 'repeat(6, 4em)',
      },
      gridAutoRows: {
        '3em': '3em',
      },
      padding: {
        '1/1': '100%',
      },
    },
  },
  plugins: [],
};
