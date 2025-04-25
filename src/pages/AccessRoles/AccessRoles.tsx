import { FC, ReactElement, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { useFetchAccessRoles } from 'src/hooks/services/useFetchAccessRoles';
import AccessRoleCard from 'src/pages/AccessRoles/components/AccessRoleCard';
import useSearch from 'src/hooks/useSearch';
import { AccessRole } from 'src/types';
import Search from 'src/components/Search';
import UserRoleFiler from 'src/pages/AccessRoles/components/UserRoleFilter.tsx';

const AccessRoles: FC = (): ReactElement => {
  const { data, isLoading } = useFetchAccessRoles();
  const [query, setQuery] = useState<string>('');

  const filteredData = useSearch<AccessRole>(data, query);

  return (
    <>
      <Typography variant="h2" pb={4}>
        Access roles
      </Typography>

      <Stack
        mb={2}
        spacing={2}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <Search query={query} setQuery={setQuery} isLoading={isLoading} />
        <UserRoleFiler roles={data} />
      </Stack>

      <Stack spacing={2}>
        {isLoading ? (
          [...new Array(3)].map((_, index) => (
            <AccessRoleCard key={index} data={null} isLoading={true} />
          ))
        ) : filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <AccessRoleCard
              data={item}
              key={`${item.name}-${index}`}
              isLoading={false}
            />
          ))
        ) : (
          <Typography>No roles found</Typography>
        )}
      </Stack>
    </>
  );
};

export default AccessRoles;
