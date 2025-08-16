import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Box, Card, Skeleton, Stack, Typography } from '@mui/material';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';

import { type ActivityLog } from 'src/types';
import { useFetchActivityLogs } from 'src/hooks/services/useFetchActivityLogs.tsx';
import { useFetchEvent } from 'src/hooks/services/useFetchEvent';
import { useFetchAccessRoles } from 'src/hooks/services/useFetchAccessRoles.tsx';
import { useFetchAccessRequests } from 'src/hooks/services/useFetchAccessRequests.tsx';

import DataTable from 'src/components/table/DataTable';
import Modal from 'src/components/Modal';
import Search from 'src/components/Search.tsx';
import useSearch from 'src/hooks/useSearch.tsx';

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
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'message', header: 'Message' },
  { accessorKey: 'raisedBy', header: 'Raised by' },
  { accessorKey: 'approvedBy', header: 'Approved by' },
  { accessorKey: 'id', header: 'ID' },
];

const EventItem = ({ id }: { id: string }) => {
  const { data, isLoading } = useFetchEvent(id);

  if (isLoading) {
    return <Skeleton variant="text" width="100%" />;
  }

  return (
    <Stack gap={1}>
      <Typography variant="body2" color="textSecondary">
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </Typography>
    </Stack>
  );
};

type CardProps = {
  title: string;
  count: number;
  icon: React.ReactNode;
};

const DashboardCard: React.FC<CardProps> = ({ title, count, icon }) => {
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
  const [selectedEvent, setSelectedEvent] = useState<ActivityLog | null>(null);

  const { data, isLoading } = useFetchActivityLogs();
  const { data: roles, isLoading: isRolesLoading } = useFetchAccessRoles();
  const { data: requests, isLoading: isRequestsLoading } =
    useFetchAccessRequests();

  const filteredData = useSearch<ActivityLog>(data, query);

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
              count={roles?.length || 0}
              icon={<PeopleAltTwoToneIcon />}
            />
            <DashboardCard
              title={`Role "Test"`}
              count={roles?.length || 0}
              icon={<PeopleAltTwoToneIcon />}
            />
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
          onRowClick={(row) => setSelectedEvent(row)}
        />
      )}

      <Modal
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title="Event Details"
        copyText={
          selectedEvent ? JSON.stringify(selectedEvent, null, 2) : undefined
        }
      >
        {selectedEvent && <EventItem id={selectedEvent.eventId} />}
      </Modal>
    </Stack>
  );
};

export default Dashboard;
