import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#A8FF5C',
      light: '#D4FFA5',
      dark: '#6CBF3F',
      contrastText: '#121317',
    },
    secondary: {
      main: '#1E1F23',
      light: '#3A3D44',
      dark: '#121416',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#121317',
      paper: '#17181C',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#D7D9DD',
      disabled: '#555555',
    },
    action: {
      active: '#A8FF5C',
      hover: '#85CC47',
      selected: '#B8FF7A',
      disabled: '#616161',
    },
    error: {
      main: '#F03E5E',
      light: '#FF8A80',
      dark: '#C62828',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FAEB2E',
      light: '#FFF59D',
      dark: '#F9A825',
      contrastText: '#121317',
    },
    info: {
      main: '#549CEA',
      light: '#90CAF9',
      dark: '#1565C0',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#A8FF5C',
      light: '#D4FFA5',
      dark: '#6CBF3F',
      contrastText: '#121317',
    },
  },
  typography: {
    fontFamily: 'Geist Variable, sans-serif',
    h2: {
      fontSize: '1.6rem',
      fontWeight: 800,
      color: '#FFFFFF',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#FFFFFF',
    },
    h6: {
      fontSize: '1rem',
      textTransform: 'uppercase',
      fontWeight: 800,
      color: '#FFFFFF',
    },
    body1: {
      fontFamily: 'Geist Mono Variable, monospace',
      fontSize: '1rem',
      color: '#D7D9DD',
      lineHeight: '1.5rem',
    },
    body2: {
      fontFamily: 'Geist Mono Variable, monospace',
      fontSize: '0.875rem',
      color: '#D7D9DD',
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
          backgroundImage: 'none',

          // border: '1px solid #1d212d',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#3C3D44',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          '&:hover': {
            '& .MuiListItemText-primary': {
              color: '#FFFFFF',
            },
            '& .MuiSvgIcon-root': {
              color: '#FFFFFF',
            },
          },
          '&.Mui-selected': {
            backgroundColor: '#A8FF5C',
            '& .MuiListItemText-primary': {
              color: '#121317',
            },
            '& .MuiSvgIcon-root': {
              color: '#121317',
            },
            '&:hover': {
              backgroundColor: '#A8FF5C',

              '& .MuiListItemText-primary': {
                color: '#121317',
              },
              '& .MuiSvgIcon-root': {
                color: '#121317',
              },
            },
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#121317',
          },
          '&.Mui-selected': {
            '&:hover': {
              color: 'inherit',
            },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#3C3D44',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: ({ theme }) => ({
          display: 'flex',
          flexDirection: 'column',
          [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
          },
        }),
        action: ({ theme }) => ({
          marginLeft: 'auto',
          [theme.breakpoints.down('md')]: {
            paddingTop: theme.spacing(2),
          },
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxSizing: 'border-box',
          borderRight: 'none',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
