/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'input-error': "hsl(0, 100%, 66%)",
        "very-dark-violet": "hsl(278, 68%, 11%)",
      },
      keyframes: {
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))', opacity: 1 },
          to: { transform: 'translateX(calc(100% + var(--toast-right-padding)))', opacity: 0 },
        },
        slideIn: {
          from: { transform: `translateX(calc(100% + var(--toast-right-padding)))`},
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        swipeOut: 'swipeOut 100ms ease-out',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [
    require("daisyui"), 
    require('flowbite/plugin')
  ],
}
