/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       fontSize: {
        'home-heading-small': ['28px', '34px'],
        'home-heading-large': ['48px', '56px'],
        'course-details-heading-small': ['26px', '36px'],
        'course-details-heading-large': ['36px', '44px'],
        'default': ['15px', '21px'],
    },
  },
},
  plugins: [],
}