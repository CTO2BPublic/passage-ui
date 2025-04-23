import React, { useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Skeleton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ControlledSelectSearchField from 'src/components/form/ControlledSelectSearchField';
import ControlledRadioGroupField from 'src/components/form/ControlledRadioGroupField.tsx';
import { AccessRole } from 'src/types';
import { useFetchUsersRoleMapping } from 'src/hooks/services/useFetchUsersRoleMapping.tsx'; // Ensure AccessUser is defined

type Props = {
  roles: AccessRole[];
};

const UserRoleFilter: React.FC<Props> = ({ roles }) => {
  const methods = useForm({
    defaultValues: {
      filterType: 'user',
      userValue: 'All',
      roleValue: 'All',
      open: false,
    },
  });

  const { watch, setValue } = methods;

  const filterType = watch('filterType');
  const userValue = watch('userValue');
  const roleValue = watch('roleValue');
  const open = watch('open');

  const {
    data = [],
    isLoading,
    isFetched,
  } = useFetchUsersRoleMapping({ enabled: open });

  const filteredUsernames = useMemo(() => {
    if (roleValue === 'All') {
      return data.map((user) => user.username);
    }
    return data
      .filter((user) => user.roles?.includes(roleValue))
      .map((user) => user.username);
  }, [roleValue, data]);

  const filteredRoleNames = useMemo(() => {
    if (userValue === 'All') {
      return Array.from(new Set(data.flatMap((user) => user.roles || [])));
    }
    const selectedUser = data.find((user) => user.username === userValue);
    return selectedUser?.roles ? Array.from(new Set(selectedUser.roles)) : [];
  }, [userValue, data]);

  const isUsersVisible = useMemo(() => filterType === 'user', [filterType]);

  const filteredData = isUsersVisible ? filteredRoleNames : filteredUsernames;

  return (
    <FormProvider {...methods}>
      <IconButton
        onClick={() => setValue('open', true)}
        sx={{ mt: '0px !important' }}
      >
        <ListAltIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setValue('open', false)}
      >
        <Box width={320} pt={2} pb={5} height="100%">
          <Box px={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" py={2}>
                Filter by user or role
              </Typography>
              <IconButton onClick={() => setValue('open', false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <ControlledRadioGroupField
              name="filterType"
              options={[
                { label: 'User', value: 'user' },
                { label: 'Access Role', value: 'role' },
              ]}
              row
              disabled={isLoading}
            />

            <Box display={isUsersVisible ? 'initial' : 'none'}>
              <ControlledSelectSearchField
                label="User name"
                name="userValue"
                options={[
                  { value: 'All', label: 'All' },
                  ...(data ?? []).map(({ username }) => ({
                    value: username,
                    label: username,
                  })),
                ]}
                size="small"
                disabled={isLoading}
              />
            </Box>

            <Box display={!isUsersVisible ? 'initial' : 'none'}>
              <ControlledSelectSearchField
                label="Role name"
                name="roleValue"
                options={[
                  { value: 'All', label: 'All' },
                  ...(roles ?? []).map(({ name }) => ({
                    value: name,
                    label: name,
                  })),
                ]}
                size="small"
                disabled={isLoading}
              />
            </Box>
          </Box>

          <Box
            py={2}
            maxHeight="calc(100% - 140px)"
            style={{ overflowY: 'auto' }}
          >
            {isLoading ? (
              <List sx={{ p: 0 }}>
                {[...Array(5)].map((_, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={<Skeleton variant="text" width="100%" />}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <List sx={{ p: 0 }}>
                {filteredData.map((item, id) => (
                  <ListItem key={`${item}-${id}`}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
                {isFetched && !filteredData?.length && (
                  <ListItem>
                    <Typography variant="body2">No data found</Typography>
                  </ListItem>
                )}
              </List>
            )}
          </Box>
        </Box>
      </Drawer>
    </FormProvider>
  );
};

export default UserRoleFilter;
