import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';

import { AccessRequestStatus, type ActivityLog } from 'src/types';
import { useFetchActivityLogs } from 'src/hooks/services/useFetchActivityLogs.tsx';
import { useFetchAccessRoles } from 'src/hooks/services/useFetchAccessRoles.tsx';
import { useFetchAccessRequests } from 'src/hooks/services/useFetchAccessRequests.tsx';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';

import DataTable from 'src/components/table/DataTable';
import Search from 'src/components/Search.tsx';
import useSearch from 'src/hooks/useSearch.tsx';
import { useFetchUsersRoleMapping } from 'src/hooks/services/useFetchUsersRoleMapping.tsx';
import DashboardCard from 'src/pages/Dashboard/components/DashboardCard.tsx';
import Event from 'src/pages/Dashboard/components/Event';

const columns: ColumnDef<ActivityLog>[] = [
  {
    accessorKey: 'date',
    header: () => <Box pl={1.5}>Date</Box>,
    cell: ({ row }) => (
      <span>
        {row?.original.date
          ? format(new Date(row.original.date), 'yyyy-MM-dd HH:mm')
          : ''}
      </span>
    ),
  },
  { accessorKey: 'raisedBy', header: 'Raised by' },
  { accessorKey: 'approvedBy', header: 'Approved by' },
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'message', header: 'Message' },
];

const Dashboard = () => {
  const [query, setQuery] = useState<string>('');
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);

  const { data, isLoading } = useFetchActivityLogs();
  const { data: roles, isLoading: isRolesLoading } = useFetchAccessRoles();
  const { data: requests, isLoading: isRequestsLoading } =
    useFetchAccessRequests();
  const { data: users, isLoading: isUsersLoading } = useFetchUsersRoleMapping({
    enabled: true,
  });

  const filteredData = useSearch<ActivityLog>(data, query);

  const activeRequestsCount = requests
    ? requests.filter(
        (req) => req.status?.status === AccessRequestStatus.PENDING,
      ).length
    : 0;

  const usersByRole =
    roles
      ?.filter((role) => role.annotations?.['dashboard.passage.io/enabled'])
      .map((role) => ({
        name: role.name,
        count:
          users?.filter((user) => user?.roles?.includes(role.name)).length || 0,
      })) || [];

  const loading =
    isLoading || isRolesLoading || isRequestsLoading || isUsersLoading;
  const noData = !loading && filteredData?.length === 0;

  return (
    <Stack gap={3}>
      <Stack
        component="div"
        flexDirection={['column', 'row']}
        useFlexGap
        gap={2}
        spacing={2}
        flexWrap="wrap"
      >
        {loading ? (
          [...Array(4)].map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rounded"
              width={'100%'}
              height={120}
              animation="wave"
              sx={{
                flex: '1 1 calc(25% - 16px)',
                minWidth: 220,
              }}
            />
          ))
        ) : (
          <>
            <DashboardCard
              title="Active requests"
              count={activeRequestsCount || 0}
              icon={<VpnKeyTwoToneIcon />}
            />

            <DashboardCard
              title="Users"
              count={users?.length || 0}
              icon={<PeopleAltTwoToneIcon />}
            />

            {usersByRole.map(({ name, count }) => (
              <DashboardCard
                key={name}
                title={name}
                count={count}
                icon={<ManageAccountsTwoToneIcon />}
              />
            ))}
          </>
        )}
      </Stack>

      <Typography variant="h2">Activity logs</Typography>

      <Search query={query} setQuery={setQuery} isLoading={isLoading} />

      {loading && (
        <Stack gap={1}>
          {[...Array(5)].map((_, idx) => (
            <Skeleton key={idx} variant="rounded" height={40} />
          ))}
        </Stack>
      )}

      {noData && (
        <Typography variant="body1" color="text.secondary">
          No data found
        </Typography>
      )}

      {!loading && !noData && (
        <DataTable
          columns={columns}
          data={filteredData || []}
          onRowClick={(row) => setSelectedLog(row)}
        />
      )}
      {selectedLog?.eventId && (
        <Event
          id={selectedLog.eventId}
          open={!!selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      )}
    </Stack>
  );
};

export default Dashboard;
