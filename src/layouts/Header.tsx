import { Typography, Stack, Avatar, Link as MuiLink } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import paths from 'src/utils/paths';
import { useFetchUser } from 'src/hooks/services/useFetchUser';

const Header = () => {
  const { data } = useFetchUser();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const getInitials = (username: string) => {
    const nameParts = username.split(' ');
    return nameParts.length > 1
      ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
      : username.substring(0, 2).toUpperCase();
  };

  const getLinkStyles = (path: string) => {
    const active = isActive(path);
    return {
      fontWeight: active ? 'bold' : 'normal',
      textDecoration: active ? 'none' : 'none',
      '&:hover': {
        textDecoration: 'none',
        color: 'primary.main',
      },
    };
  };

  return (
    <Stack
      direction={'row'}
      component="header"
      spacing={[1, 2]}
      justifyContent="space-between"
      alignItems="center"
      mt={0.5}
      px={{ xs: 2, sm: 3 }}
      py={4}
      width="100%"
      maxWidth="lg"
      mx="auto"
      gap={[1, 2]}
      flexWrap="wrap"
    >
      <Typography variant="h6" pr={[0, 4]}>
        PASSAGE
      </Typography>
      <Stack direction="row" component="nav" spacing={[1, 2]}>
        <MuiLink
          component={Link}
          to={paths.accessRoles}
          sx={getLinkStyles(paths.accessRoles)}
        >
          Access roles
        </MuiLink>
        <MuiLink
          component={Link}
          to={paths.accessRequests}
          sx={getLinkStyles(paths.accessRequests)}
        >
          Access requests
        </MuiLink>
      </Stack>
      {data?.username && (
        <MuiLink
          component={Link}
          to={paths.userSettings}
          sx={{ ...getLinkStyles(paths.userSettings), ml: 'auto !important' }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            flex={[1, 'initial']}
          >
            <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 'initial' }}>
              <Typography variant="body1" color="secondary" fontWeight="bold">
                {getInitials(data.username)}
              </Typography>
            </Avatar>
            <Typography variant="body1" fontWeight="bold">
              {data.username}
            </Typography>
          </Stack>
        </MuiLink>
      )}
    </Stack>
  );
};

export default Header;
