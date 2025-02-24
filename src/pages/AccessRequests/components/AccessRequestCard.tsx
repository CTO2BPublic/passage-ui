import Typography from '@mui/material/Typography';
import { AccessRequest, AccessRequestStatus } from 'src/types';
import { Box, Chip, Skeleton, Stack } from '@mui/material';
import { useDeleteAccessRequest } from 'src/hooks/services/useDeleteAccessRequest';
import { useExpireAccessRequest } from 'src/hooks/services/useExpireAccessRequest';
import { useApproveAccessRequest } from 'src/hooks/services/useApproveAccessRequest';
import {
  getAccessRequestStatusColor,
  getProviderStatusColor,
} from 'src/utils/helpers';
import ConfirmationDialog from 'src/components/ConfirmationDialog';
import useConfirmationDialog from 'src/hooks/useConfirmationDialog';
import { format } from 'date-fns';
import CardSection from 'src/components/Card/CardSection';
import Card from 'src/components/Card/Card.tsx';

const AccessRequestCard = ({
  data,
  isLoading,
}: {
  data: AccessRequest | null;
  isLoading: boolean;
}) => {
  const { mutate: mutateApprove, isPending: isApproveLoading } =
    useApproveAccessRequest();
  const { mutate: mutateExpire, isPending: isExpireLoading } =
    useExpireAccessRequest();
  const { mutate: mutateDelete, isPending: isDeleteLoading } =
    useDeleteAccessRequest();

  const isHeaderActionLoading =
    isApproveLoading || isExpireLoading || isDeleteLoading;

  const {
    isOpen,
    isLoading: isDialogLoading,
    openDialog,
    closeDialog,
    confirmAction,
  } = useConfirmationDialog({
    onConfirm: async () => {
      if (data?.id) {
        mutateDelete(data.id);
      }
    },
  });

  if (isLoading || !data) {
    return (
      <Card
        id="loading-access-request-card"
        header={{
          title: <Skeleton variant="text" width="40%" />,
          tags: <Skeleton variant="rectangular" width={50} height={20} />,
        }}
        subheader={<Skeleton variant="text" width="60%" />}
        menuItems={[]}
        content={<Skeleton variant="rectangular" width="100%" height={200} />}
        expandable={false}
      />
    );
  }

  return (
    <>
      <Card
        id="access-request-card"
        header={{
          title: data.roleRef.name,
          tags: (
            <>
              <Chip
                label={data.status.status}
                color={getAccessRequestStatusColor(data.status.status)}
                size="small"
                variant="outlined"
              />
              <Chip
                label={`Expiration time (TTL): ${data.details.ttl}`}
                color="secondary"
                size="small"
              />
            </>
          ),
        }}
        subheader={`Requested by ${data.status.requestedBy}`}
        menuItems={[
          {
            label: 'Approve',
            onClick: async () => mutateApprove(data.id),
            hidden: data.status.status !== AccessRequestStatus.PENDING,
            disabled: isHeaderActionLoading,
          },
          {
            label: 'Expire',
            onClick: async () => mutateExpire(data.id),
            hidden: data.status.status !== AccessRequestStatus.APPROVED,
            disabled: isHeaderActionLoading,
          },
          {
            label: 'Delete',
            onClick: openDialog,
            hidden: data.status.status === AccessRequestStatus.APPROVED,
            disabled: isHeaderActionLoading,
          },
        ]}
        content={
          <>
            <CardSection
              title="Creation Timestamp"
              text={
                data?.createdAt &&
                format(new Date(data.createdAt), 'yyyy-MM-dd HH:mm')
              }
              noDataText="No creation timestamp provided"
            />

            <CardSection
              title="Justification"
              text={data.details.justification}
              noDataText="No justification provided"
            />

            <CardSection
              title="Approval Rule"
              content={
                <Stack flexDirection="column" gap={1}>
                  <Typography variant="body2">
                    <strong>Rule:</strong>{' '}
                    {data.status.approvalRule?.string ||
                      'No description provided'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Can author approve?</strong>{' '}
                    {data.status.approvalRule?.authorCanApprove ? 'Yes' : 'No'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Users:</strong>{' '}
                    {data.status.approvalRule?.users.join(', ') || 'No users'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Groups:</strong>{' '}
                    {data.status.approvalRule?.groups.join(', ') || 'No groups'}
                  </Typography>
                </Stack>
              }
            />

            <CardSection
              title="Trace"
              text={data.trace}
              noDataText={'No trace information available'}
            />

            <CardSection
              title="Attributes"
              content={
                Object.entries(data.details.attributes || {}).length > 0 &&
                Object.entries(data.details.attributes || {}).map(
                  ([key, value]) => (
                    <Typography
                      variant="body2"
                      key={key}
                    >{`${key}: ${JSON.stringify(value)}`}</Typography>
                  ),
                )
              }
              noDataText={'No attributes available'}
            />

            <CardSection
              title="Provider Statuses"
              content={
                Object.entries(data.status.providerStatuses || {}).length > 0 &&
                Object.entries(data.status.providerStatuses || {}).map(
                  ([key, { action, details, error }]) => (
                    <Box key={key} sx={{ marginBottom: 1 }}>
                      <Stack
                        gap={1}
                        flexDirection="row"
                        alignItems="center"
                        pb={1}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {key}
                        </Typography>
                        <Chip
                          label={action}
                          color={getProviderStatusColor(action)}
                          sx={{ width: 'fit-content' }}
                        />
                      </Stack>
                      <Typography variant="body2">{`Details: ${details}`}</Typography>
                      {error && (
                        <Typography variant="body2">{`Error message: ${error}`}</Typography>
                      )}
                    </Box>
                  ),
                )
              }
              noDataText={'No provider statuses available'}
            />

            <CardSection
              title="Provider Usernames"
              content={
                Object.entries(data.status.providerUsernames || {}).length >
                  0 && (
                  <Stack flexDirection="column" gap={1}>
                    {Object.entries(data.status.providerUsernames || {}).map(
                      ([key, value]) => (
                        <Typography variant="body2" key={key}>
                          <strong>{key}:</strong> {value}
                        </Typography>
                      ),
                    )}
                  </Stack>
                )
              }
              noDataText={'No provider usernames available'}
            />
          </>
        }
        expandable={true}
      />

      <ConfirmationDialog
        open={isOpen}
        onConfirm={confirmAction}
        onClose={closeDialog}
        isLoading={isDialogLoading || isDeleteLoading}
        title="Confirm Deletion"
        itemName={data.roleRef.name}
        description="Are you sure you want to delete the access request for the role?"
      />
    </>
  );
};

export default AccessRequestCard;
