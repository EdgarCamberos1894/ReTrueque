import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    fontFamily: {
      lato: ['var(--font-lato)', 'sans-serif'],
    },
    fontSize: {
      xs: ['clamp(0.95rem, calc(0.92rem + 0.15vw), 1rem)', { lineHeight: '1.5' }],
      md: ['clamp(1.25rem, calc(1.1rem + 0.65vw), 1.5rem)', { lineHeight: '1.35' }],
      'display-large': [
        'clamp(2.5rem, calc(1.8rem + 3vw), 3.5rem)',
        { lineHeight: '1.1' },
      ],
      'display-medium': [
        'clamp(2.25rem, calc(1.7rem + 2.4vw), 3rem)',
        { lineHeight: '1.12' },
      ],
      'display-small': [
        'clamp(2rem, calc(1.55rem + 2vw), 2.75rem)',
        { lineHeight: '1.15' },
      ],
      'display-small-bold': [
        'clamp(2rem, calc(1.7rem + 1.35vw), 2.25rem)',
        { lineHeight: '1.2', fontWeight: '700' },
      ],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        image404: "url('/404/down.png')",
      },
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: 'hsl(var(--primary) / <alpha-value>)',
        'primary-variant-1': 'hsl(var(--primary-variant-1) / <alpha-value>)',
        'primary-variant-2': 'hsl(var(--primary-variant-2) / <alpha-value>)',
        secondary: 'hsl(var(--secondary) / <alpha-value>)',
        'secondary-variant-1': 'hsl(var(--secondary-variant-1) / <alpha-value>)',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: 'hsl(var(--muted) / <alpha-value>)',
        'muted-foreground': 'hsl(var(--muted-foreground) / <alpha-value>)',
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
