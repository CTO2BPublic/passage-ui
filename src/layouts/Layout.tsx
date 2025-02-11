import { Outlet } from 'react-router-dom';
import Header from 'src/layouts/Header';
import { Box, Container } from '@mui/material';

const Layout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Header />
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flex: 1,
          width: '100%',
          overflow: 'auto',
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          py: 4,
          boxShadow: 1,
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
