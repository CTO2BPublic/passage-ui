import Typography from '@mui/material/Typography';
import { AccessRole } from 'src/types';
import { Chip, Skeleton, Stack } from '@mui/material';
import AccessRequestFormModal from 'src/components/AccessRequestFormModal';
import useVisibility from 'src/hooks/useVisibility';
import CardSection from 'src/components/Card/CardSection';
import Card from 'src/components/Card/Card.tsx';

const AccessRoleCard = ({
  data,
  isLoading,
}: {
  data: AccessRole | null;
  isLoading: boolean;
}) => {
  const { isVisible, show, hide } = useVisibility();

  if (isLoading || !data) {
    return (
      <Card
        id="access-role-card"
        header={{
          title: <Skeleton variant="text" width="40%" />,
          tags: <Skeleton variant="rectangular" width={50} height={20} />,
        }}
        subheader={<Skeleton variant="text" width="60%" />}
        menuItems={[]}
        content={<Skeleton variant="rectangular" width="100%" height={100} />}
        expandable={false}
      />
    );
  }

  return (
    <>
      <Card
        id="access-role-card"
        header={{
          title: data.name,
          tags: data.tags.map((tag, id) => (
            <Chip
              label={tag}
              key={`${id}-${tag}`}
              sx={{ marginTop: '0px !important' }}
              id={`${id}-tag-${tag}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          )),
        }}
        subheader={data.description}
        menuItems={[
          {
            label: 'Create access request',
            onClick: show,
          },
        ]}
        content={
          <CardSection
            title="Providers"
            content={
              data.providers.length > 0 ? (
                <Stack flexDirection="column" gap={2}>
                  {data.providers.map((item) => (
                    <Stack key={item.name} flexDirection="column" gap={0.5}>
                      <Typography variant="body2" color="primary">
                        <strong>{item.name}</strong> ({item.provider})
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Credential: {item.credentialRef.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Parameters: {JSON.stringify(item.parameters, null, 2)}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              ) : (
                'No providers available'
              )
            }
          />
        }
        expandable={true}
      />
      <AccessRequestFormModal
        open={isVisible}
        handleClose={hide}
        initialRoleName={data.name}
      />
    </>
  );
};

export default AccessRoleCard;
