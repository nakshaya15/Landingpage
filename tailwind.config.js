/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        // Animation remains the same for the smooth color flow
        'color-shift': 'color-shift 6s ease infinite alternate', 
      },
      keyframes: {
        'color-shift': { 
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundSize: {
        '300': '300% auto', // Ensures the multi-color gradient flows correctly
      }
    },
  },
  safelist: [
    // --- 1. Efficient Patterns for Dynamic Classes (Current Palette) ---
    // Ensure pink, purple, green, teal, amber, indigo, fuchsia, sky, yellow, blue are included
    {
      pattern: /(from|to|via|border|text|shadow|ring)-(pink|purple|green|teal|amber|indigo|fuchsia|sky|yellow|blue)-(50|100|200|300|500|600|700|800)\/?(60)?/,
      variants: ['hover', 'group-hover'],
    },
    
    // --- 2. Static Classes from the FoundersProfile.tsx Component ---
    'text-fuchsia-400', // Added fuchsia to match the new color scheme
    'text-indigo-300', 
    'text-yellow-400', 
    'bg-gradient-to-r', 
    'from-indigo-900', 
    'to-purple-900', 
    'border-fuchsia-500',
    'border-purple-500', 
    'shadow-3xl', 
    'text-white', 
    'text-gray-200',
    'text-gray-300',

    // --- 3. New Classes for Multi-Color Gradient Shift Effect ---
    'bg-300', 
    'animate-color-shift', 
    
    // SAFELISTING SPECIFIC GRADIENT COLORS FOR THE SHIFT EFFECT (NEW COMBINATIONS)
    // Card 1: Pink/Fuchsia/Purple Shift
    'from-pink-300', 'via-fuchsia-300', 'to-purple-300', 
    
    // Card 2: Teal/Sky/Green Shift
    'from-teal-300', 'via-sky-300', 'to-green-300', 

    // Card 3: Amber/Yellow/Orange Shift
    'from-amber-300', 'via-yellow-300', 'to-orange-300',

    // Card 4: Indigo/Blue/Purple Shift (Static Block)
    'from-indigo-300', 'via-blue-300', 'to-purple-300', 
  ],
  plugins: [],
};