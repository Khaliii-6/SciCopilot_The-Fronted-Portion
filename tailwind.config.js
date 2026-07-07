/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sci: {
          // Dark theme (default)
          bg: 'rgb(var(--sci-bg-rgb) / <alpha-value>)',
          bg2: 'rgb(var(--sci-bg2-rgb) / <alpha-value>)',
          bg3: 'rgb(var(--sci-bg3-rgb) / <alpha-value>)',
          bg4: 'rgb(var(--sci-bg4-rgb) / <alpha-value>)',
          ink: 'rgb(var(--sci-ink-rgb) / <alpha-value>)',
          muted: 'rgb(var(--sci-muted-rgb) / <alpha-value>)',
          primary: 'rgb(var(--sci-primary-rgb) / <alpha-value>)',
          accent: 'rgb(var(--sci-accent-rgb) / <alpha-value>)',
          accent2: 'rgb(var(--sci-accent2-rgb) / <alpha-value>)',
          success: 'rgb(var(--sci-success-rgb) / <alpha-value>)',
          warning: 'rgb(var(--sci-warning-rgb) / <alpha-value>)',
          danger: 'rgb(var(--sci-danger-rgb) / <alpha-value>)',
          purple: 'rgb(var(--sci-purple-rgb) / <alpha-value>)',
          border: 'rgb(var(--sci-border-rgb) / <alpha-value>)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans CJK SC', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'Courier New', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(56,189,248,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(56,189,248,0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-tech': 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(139,92,246,0.15) 100%)',
        'gradient-glow': 'linear-gradient(90deg, transparent, rgba(56,189,248,0.1), transparent)',
      },
    },
  },
  plugins: [],
}
