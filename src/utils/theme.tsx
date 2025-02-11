import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#009688',
      light: '#4DB6AC',
      dark: '#00796B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#253238',
      light: '#4E5B61',
      dark: '#1B2A2A',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#0b0c0e',
      paper: '#0b0c0e',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#B0B0B0',
      disabled: '#555555',
    },
    action: {
      active: '#009688',
      hover: '#00796B',
      selected: '#4DB6AC',
      disabled: '#616161',
    },
    error: {
      main: '#E53935',
      light: '#FF6F61',
      dark: '#AB000D',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFA726',
      light: '#FFCC80',
      dark: '#F57C00',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#29B6F6',
      light: '#81D4FA',
      dark: '#0288D1',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#43A047',
      light: '#66BB6A',
      dark: '#1B5E20',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Inter Tight Variable, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#E0E0E0',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#E0E0E0',
    },
    body1: {
      fontSize: '1rem',
      color: '#B0B0B0',
      lineHeight: '1.5rem',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#B0B0B0',
      lineHeight: '1.25rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #1d212d',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
