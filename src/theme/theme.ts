'use client';

import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1565c0', // Azul forte
    },
    secondary: {
      main: '#d32f2f', // Vermelho intenso
    },
    background: {
      default: '#f9f9f9',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ffff', // Azul neon
      contrastText: '#000',
    },
    secondary: {
      main: '#ff4da6', // Rosa neon
      contrastText: '#000',
    },
    background: {
      default: '#000000',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '6px 16px',
          fontWeight: 500,
          transition: 'all 0.3s ease',
        },
        containedPrimary: {
          backgroundImage: 'linear-gradient(45deg, #00ffff, #00bcd4)',
          color: '#000',
          '&:hover': {
            filter: 'brightness(1.2)',
          },
        },
        containedSecondary: {
          backgroundImage: 'linear-gradient(45deg,rgb(23, 36, 105),rgb(122, 29, 60))',
          color: '#fff',
          '&:hover': {
            filter: 'brightness(1.2)',
          },
        },
        outlinedPrimary: {
          borderColor: '#00ffff',
          color: '#00ffff',
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 255, 0.1)',
          },
        },
        outlinedSecondary: {
          borderColor: '#ff4da6',
          color: '#ff4da6',
          '&:hover': {
            backgroundColor: 'rgba(255, 77, 166, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#121212',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0d0d0d',
          borderBottom: '1px solid #1f1f1f',
        },
      },
    },
  },
});

