/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // scans all JS/TS/TSX/JSX files in src
  ],
  theme: {
    extend: {},
  },
  safelist: [
    // === INDIGO (Original + Enhanced) ===
    'from-indigo-50', 'to-indigo-100',
    'border-indigo-500', 
    'text-indigo-600', 'text-indigo-700', 'text-indigo-800', 
    'hover:shadow-indigo-400/60',
    'ring-indigo-300', 'ring-indigo-200', 

    // === GREEN (Original + Enhanced) ===
    'from-green-50', 'to-green-100',
    'border-green-500', 
    'text-green-600', 'text-green-700', 'text-green-800', 
    'hover:shadow-green-400/60',
    'ring-green-300', 'ring-green-200',

    // === PURPLE (Original + Enhanced, including 600 border for VisionMission) ===
    'from-purple-50', 'to-purple-100',
    'border-purple-500', 'border-purple-600', // Added 600
    'text-purple-600', 'text-purple-700', 'text-purple-800', 
    'hover:shadow-purple-400/60',
    'ring-purple-300', 'ring-purple-200',

    // === TEAL (New from AboutUs enhancement) ===
    'from-teal-50', 'to-teal-100',
    'border-teal-500', 
    'text-teal-600', 'text-teal-700', 'text-teal-800', 
    'hover:shadow-teal-400/60',
    'ring-teal-300', 'ring-teal-200', 
    
    // === AMBER (New from AboutUs enhancement) ===
    'from-amber-50', 'to-amber-100',
    'border-amber-500', 
    'text-amber-600', 'text-amber-700', 'text-amber-800', 
    'hover:shadow-amber-400/60',
    'ring-amber-300', 'ring-amber-200', 

    // === PINK (New from VisionMission enhancement) ===
    'from-pink-50', 'to-pink-100',
    'border-pink-600', 
    'text-pink-600', 'text-pink-700', 'text-pink-800', 
    'hover:shadow-pink-400/60',
    'ring-pink-300', 'ring-pink-200',
  ],
  plugins: [],
};
