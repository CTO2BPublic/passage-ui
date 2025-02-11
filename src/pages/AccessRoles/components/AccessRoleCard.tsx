import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { AccessRole } from 'src/types';
import { Box, Button, Chip, Stack, Skeleton } from '@mui/material';
import AccessRequestFormModal from 'src/components/AccessRequestFormModal';
import CardHeaderAction from 'src/components/Card/CardHeaderAction';
import useVisibility from 'src/hooks/useVisibility';
import CardSection from 'src/components/Card/CardSection';
import { useState } from 'react';

const AccessRoleCard = ({
  data,
  isLoading,
}: {
  data: AccessRole | null;
  isLoading: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const { isVisible, show, hide } = useVisibility();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (isLoading || !data) {
    return (
      <Card sx={{ width: '100%' }} id="access-role-card-loading">
        <CardHeader
          title={<Skeleton variant="text" width="40%" />}
          subheader={<Skeleton variant="text" width="60%" />}
        />
        <CardActions disableSpacing>
          <Skeleton
            variant="rectangular"
            width={100}
            height={30}
            sx={{ marginLeft: 'auto' }}
          />
        </CardActions>
      </Card>
    );
  }

  return (
    <>
      <Card sx={{ width: '100%' }} id={`access-role-card-${data.name}`}>
        <CardHeader
          action={
            <>
              <CardHeaderAction
                menuItems={[
                  {
                    label: 'Create access request',
                    onClick: show,
                  },
                ]}
              />
            </>
          }
          title={
            <Stack
              flexDirection="row"
              alignItems="center"
              gap={1}
              pb={1}
              id={`access-role-header-${data.name}`}
            >
              <Typography variant="h6">{data.name}</Typography>
              <Stack
                gap={0.5}
                flexDirection="row"
                sx={{ marginTop: '0px !important' }}
              >
                {data.tags.map((tag) => (
                  <Chip
                    label={tag}
                    key={`${data.name}-${tag}`}
                    sx={{ marginTop: '0px !important' }}
                    id={`access-role-tag-${data.name}-${tag}`}
                  />
                ))}
              </Stack>
            </Stack>
          }
          subheader={data.description}
        />
        <CardActions disableSpacing>
          <Button
            size="small"
            sx={{ marginLeft: 'auto' }}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-controls={`access-role-providers-collapse-${data.name}`}
            id={`access-role-expand-button-${data.name}`}
          >
            {expanded ? 'Show less' : 'Show more'}
          </Button>
        </CardActions>

        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          id={`access-role-providers-collapse-${data.name}`}
        >
          <CardContent>
            <CardSection
              title="Providers"
              content={
                data.providers.length > 0 && (
                  <Stack flexDirection="column" gap={1}>
                    {data.providers.map((item) => (
                      <Box
                        key={item.name}
                        id={`access-role-provider-${data.name}-${item.name}`}
                      >
                        <Typography variant="body2">
                          <strong>{item.name}</strong> ({item.provider})
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Credential: {item.credentialRef.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Parameters: {JSON.stringify(item.parameters, null, 2)}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                )
              }
              noDataText="No providers available"
            />
          </CardContent>
        </Collapse>
      </Card>
      <AccessRequestFormModal
        open={isVisible}
        handleClose={hide}
        initialRoleName={data.name}
      />
    </>
  );
};

export default AccessRoleCard;
