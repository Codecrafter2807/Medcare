/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors:{
        purpleColor:"#A020F0",
        primaryColor:"#2655ff",
        yellowColor:"#d4c202",
        darkColor:"#141414",
        lightColor:"#ffffff",
        grayColor:"#9c9c9c",
        blueColor:"#1ec9f8"
      },
    },
  },
  plugins: [],
}

