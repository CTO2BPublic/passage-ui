import { useFetchAccessRequests } from 'src/hooks/services/useFetchAccessRequests';
import { Button, Stack, Typography } from '@mui/material';
import AccessRequestCard from 'src/pages/AccessRequests/components/AccessRequestCard';
import AccessRequestFormModal from 'src/components/AccessRequestFormModal';
import { useState } from 'react';
import Search from 'src/components/Search';
import useSearch from 'src/hooks/useSearch';
import { AccessRequest, AccessRequestStatus } from 'src/types';
import useVisibility from 'src/hooks/useVisibility';
import PendingAccessRequests from 'src/pages/AccessRequests/components/PendingAccessRequests.tsx';
import { useForm, FormProvider } from 'react-hook-form';
import ControlledSelectField from 'src/components/form/ControlledSelectField';

const AccessRequests = () => {
  const { isVisible, show, hide } = useVisibility();
  const { data, isLoading } = useFetchAccessRequests();
  const methods = useForm({
    defaultValues: {
      requestedBy: '',
      approvedBy: '',
      role: '',
      status: AccessRequestStatus.APPROVED,
    },
  });
  const [query, setQuery] = useState<string>('');
  const filteredData = useSearch<AccessRequest>(data, query);

  const filters = methods.watch();

  const filteredRequests = filteredData?.filter((item) => {
    const { requestedBy, approvedBy, role, status } = filters;
    const requestedByMatch = requestedBy
      ? item.status.requestedBy.includes(requestedBy)
      : true;
    const approvedByMatch = approvedBy
      ? item.status.approvedBy.includes(approvedBy)
      : true;
    const roleMatch = role ? item.roleRef?.name.includes(role) : true;
    const statusMatch = status ? item.status.status === status : true;

    return requestedByMatch && approvedByMatch && roleMatch && statusMatch;
  });

  return (
    <>
      <Typography variant="h2" pb={4}>
        Access requests
      </Typography>
      <PendingAccessRequests
        data={data?.filter(
          (item) => item.status.status === AccessRequestStatus.PENDING,
        )}
      />
      <AccessRequestFormModal open={isVisible} handleClose={hide} />
      <Stack
        mb={2}
        spacing={2}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <Search query={query} setQuery={setQuery} isLoading={isLoading} />
        <Button
          variant="contained"
          sx={{ marginTop: '0px !important' }}
          disabled={isLoading}
          onClick={show}
        >
          New
        </Button>
      </Stack>

      <FormProvider {...methods}>
        <Stack direction="row" spacing={2} mb={3}>
          <ControlledSelectField
            name="requestedBy"
            label="Requested By"
            size="small"
            all={true}
            options={[
              ...new Set(data?.map((item) => item.status.requestedBy)),
            ].map((user) => ({ value: user, label: user }))}
          />
          <ControlledSelectField
            name="approvedBy"
            label="Approved By"
            size="small"
            all={true}
            options={[
              ...new Set(data?.map((item) => item.status.approvedBy)),
            ].map((user) => ({ value: user, label: user }))}
          />
          <ControlledSelectField
            name="role"
            label="Role"
            size="small"
            all={true}
            options={[...new Set(data?.map((item) => item.roleRef?.name))].map(
              (role) => ({ value: role, label: role }),
            )}
          />
          <ControlledSelectField
            name="status"
            label="Status"
            size="small"
            all={true}
            options={Object.values(AccessRequestStatus).map((status) => ({
              value: status,
              label: status,
            }))}
          />
        </Stack>
      </FormProvider>

      <Stack spacing={2}>
        {isLoading ? (
          [...Array(3)].map((_, index) => (
            <AccessRequestCard data={null} key={index} isLoading={true} />
          ))
        ) : filteredRequests?.length > 0 ? (
          filteredRequests.map((item, index) => (
            <AccessRequestCard
              data={item}
              key={`${item.roleRef?.name}-${index}`}
              isLoading={false}
            />
          ))
        ) : (
          <Typography>No requests found</Typography>
        )}
      </Stack>
    </>
  );
};

export default AccessRequests;
