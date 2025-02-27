import { FC, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Avatar,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuList,
  Toolbar,
  Box,
  Typography,
} from '@mui/material';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import logo from 'src/assets/img/logo/logo.svg';
import paths from 'src/utils/paths';
import { User } from 'src/types';

interface MenuItemType {
  text: string;
  path: string;
  icon: ReactNode;
}

const menu: MenuItemType[] = [
  {
    text: 'Access roles',
    path: paths.accessRoles,
    icon: <AccountTreeTwoToneIcon />,
  },
  {
    text: 'Access requests',
    path: paths.accessRequests,
    icon: <VpnKeyTwoToneIcon />,
  },
];

type Props = {
  data?: User;
};

const SidebarMenu: FC<Props> = ({ data }) => {
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;

  const getInitials = (username: string): string => {
    const nameParts = username.split(' ');
    return nameParts.length > 1
      ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
      : username.substring(0, 2).toUpperCase();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, pt: 2 }}>
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              // style={{ height: 20, cursor: 'pointer' }}
            />
          </Link>
        </Box>
      </Toolbar>

      <MenuList sx={{ px: 1, flexGrow: 1 }}>
        {menu.map((item) => (
          <ListItemButton
            key={item.path}
            selected={isActive(item.path)}
            component={Link}
            to={item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </MenuList>

      <Divider />
      <MenuList>
        {data?.username && (
          <ListItemButton
            component={Link}
            to={paths.userSettings}
            sx={{ p: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 'auto', mr: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                <Typography variant="body2" color="primary.contrastText">
                  {getInitials(data.username)}
                </Typography>
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={data.username} />
          </ListItemButton>
        )}
      </MenuList>
    </Box>
  );
};

export default SidebarMenu;
