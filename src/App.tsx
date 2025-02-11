import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from 'src/utils/routes';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from 'src/utils/queryClient';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'src/contexts/SnackBar';
import theme from 'src/utils/theme';

const App = () => {
  const router = createBrowserRouter(routes());

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
