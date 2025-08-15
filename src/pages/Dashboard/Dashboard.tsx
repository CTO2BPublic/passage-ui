import { useFetchEvent } from 'src/hooks/services/useFetchEvent';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from 'src/components/table/DataTable';
import { Box, Card, Skeleton, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { type Event } from 'src/types';
import { useFetchAccessRoles } from 'src/hooks/services/useFetchAccessRoles.tsx';
import { useFetchAccessRequests } from 'src/hooks/services/useFetchAccessRequests.tsx';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import useSearch from 'src/hooks/useSearch.tsx';
import Search from 'src/components/Search.tsx';
import { useState } from 'react';
import { useFetchEvents } from 'src/hooks/services/useFetchEvents.tsx';

const columns: ColumnDef<Event>[] = [
  {
    accessorKey: 'createdAt',
    header: () => <Box pl={1.5}>Date</Box>,
    cell: ({ row }) => {
      return (
        <span>
          {row?.original.createdAt
            ? format(new Date(row.original.createdAt), 'yyyy-MM-dd HH:mm')
            : ''}
        </span>
      );
    },
  },
  { accessorKey: 'attributes.author', header: 'Author' },
  { accessorKey: 'message', header: 'Message' },
];

const EventItem = ({ id }) => {
  const { data, isLoading } = useFetchEvent(id);
  console.log(data);
  if (isLoading) {
    return <Skeleton variant="text" width="100%" />;
  }
  return (
    <Typography variant="body2" color="textSecondary">
      <strong>Event id:</strong> {id}
    </Typography>
  );
};

const DashboardCard = ({ title, count, icon }) => {
  return (
    <Card sx={{ p: 2, flex: '1' }}>
      <Stack gap={2} flexDirection="row" alignItems="center">
        <Box
          sx={{
            p: 3,
            borderRadius: '10px',
          }}
        >
          {icon}
        </Box>
        <Stack gap={1}>
          <Typography variant="body1">{title}</Typography>
          <Typography variant="h2" component="span" color="primary">
            {count}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

const Dashboard = () => {
  const [query, setQuery] = useState<string>('');

  const { data, isLoading } = useFetchEvents();
  const { data: roles, isLoading: isRolesLoading } = useFetchAccessRoles();
  const { data: requests, isLoading: isRequestsLoading } =
    useFetchAccessRequests();

  const filteredData = useSearch<Event>(data, query);

  const loading = isLoading || isRolesLoading || isRequestsLoading;
  const noData = !loading && filteredData?.length === 0;

  return (
    <Stack gap={3}>
      <Stack
        component="div"
        flexDirection={['column', 'row']}
        useFlexGap
        gap={2}
        spacing={2}
      >
        {loading ? (
          [...Array(3)].map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rounded"
              width={'100%'}
              height={120}
              animation="wave"
            />
          ))
        ) : (
          <>
            <DashboardCard
              title="Active requests"
              count={requests?.length || 0}
              icon={<PeopleAltTwoToneIcon />}
            />
            <DashboardCard
              title="Users"
              count={requests?.length || 0}
              icon={<PeopleAltTwoToneIcon />}
            />
            <DashboardCard
              title={`Role "Test"`}
              count={requests?.length || 0}
              icon={<PeopleAltTwoToneIcon />}
            />
          </>
        )}
      </Stack>

      <Typography variant="h2">Events</Typography>

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
          renderSubComponent={(row) => <EventItem id={row.id} />}
        />
      )}
    </Stack>
  );
};

export default Dashboard;
