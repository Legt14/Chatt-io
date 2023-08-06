/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        PrussianBlue: "#002147",
        MineShaft: "#1e232a",
        Elephant: "#0f2e3e",
        Tarawera: "#0b3a56",
        Elm: "#1f667f",
        HippieBlue: "#59a5b1",
        Regent: "#a2d4e2",
        LinkWater: "#e4f1f7",
        SanMarino: "#556ab1",
        CuriousBlue: "#2e97d7",
        SeaPink: "#ee9b9c",
        PersianRed: "#d33131",
      },
      fontFamily: {
        Roboto: ["Roboto"],
      },
    },
  },
  plugins: [],
};
