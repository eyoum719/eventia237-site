/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF7EE',
          100: '#F6EFD9',
          200: '#ECDCAE',
          300: '#E0C57F',
          400: '#D4AF37',
          500: '#C49E2E',
          600: '#A37F25',
          700: '#7C6120',
          800: '#554317',
          900: '#2E240C',
        },
        forest: {
          50: '#E8F0EC',
          100: '#C9DED2',
          200: '#93BCA6',
          300: '#5E9A79',
          400: '#2F7A53',
          500: '#0F4C3A',
          600: '#0D4233',
          700: '#0A3529',
          800: '#07281F',
          900: '#041A15',
        },
        cream: '#F8F5F0',
        whatsapp: '#25D366',
        whatsappDark: '#1FAD54',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(15, 76, 58, 0.08)',
        card: '0 10px 40px -8px rgba(15, 76, 58, 0.15)',
        gold: '0 8px 30px -6px rgba(212, 175, 55, 0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'wa-pulse': {
          '0%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.55)' },
          '70%': { boxShadow: '0 0 0 22px rgba(37, 211, 102, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0)' },
        },
        'wa-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-in': 'fade-in 0.8s ease-out both',
        'wa-pulse': 'wa-pulse 2.4s infinite',
        'wa-bounce': 'wa-bounce 3s ease-in-out infinite',
        'scale-in': 'scale-in 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
