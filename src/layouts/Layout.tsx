import { Outlet, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { useFetchUser } from 'src/hooks/services/useFetchUser.tsx';
import bg1 from 'src/assets/img/bg1.svg';
import bg2 from 'src/assets/img/bg2.svg';
import SidebarMenu from './SidebarMenu';

const drawerWidth = 260;

const Layout = () => {
  const { data } = useFetchUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const { pathname } = useLocation();

  useEffect(() => {
    if (mobileOpen) handleDrawerClose();
  }, [pathname]);

  const drawer = <SidebarMenu data={data} />;

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        minHeight: '100vh',
        backgroundImage: `url(${bg1}), url(${bg2})`,
        backgroundSize: '100%, 65%',
        backgroundPosition: 'bottom left, bottom right',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px}` },
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Container
        component="main"
        sx={{
          py: 2,
          flex: 1,
          width: '100%',
          height: 'auto',
          overflow: 'auto',
          px: { xs: 2, sm: 3 },
        }}
      >
        <Toolbar />
        <Box>
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

export default Layout;
