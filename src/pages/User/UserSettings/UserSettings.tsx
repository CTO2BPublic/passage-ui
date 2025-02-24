import { useForm, FormProvider } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Box,
  Typography,
  Stack,
  Skeleton,
} from '@mui/material';
import ControlledTextField from 'src/components/form/ControlledTextField';
import { useFetchUser } from 'src/hooks/services/useFetchUser';
import { useUpdateUserSettings } from 'src/hooks/services/useUpdateUserSettings';
import { useEffect } from 'react';
import CardActions from '@mui/material/CardActions';

const UserSettings = () => {
  const { data, isLoading } = useFetchUser();
  const methods = useForm({
    defaultValues: data?.settings,
  });

  const {
    formState: { isDirty },
    watch,
    reset,
  } = methods;

  const providerUsernamesValues = watch('providerUsernames');

  const { mutate, isPending: isSubmitLoading } = useUpdateUserSettings();

  useEffect(() => {
    if (data) {
      reset(data.settings);
    }
  }, [data, reset]);

  if (isLoading || !data) {
    return (
      <Card sx={{ width: '100%' }}>
        <CardHeader
          title={<Skeleton variant="text" width="40%" />}
          subheader={<Skeleton variant="text" width="60%" />}
        />
        <CardActions disableSpacing>
          <Skeleton
            variant="rectangular"
            width={100}
            height={30}
            sx={{ marginLeft: 1 }}
          />
        </CardActions>
      </Card>
    );
  }

  return (
    <>
      <Typography variant="h2" pb={4}>
        User settings
      </Typography>
      <Card>
        {data?.username && <CardHeader title={`Username: ${data.username}`} />}
        <CardContent>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit((values) => {
                mutate(values, { onSuccess: () => reset(values) });
              })}
            >
              <Stack flexDirection="column" mt={2} mb={5} gap={3}>
                {!!providerUsernamesValues &&
                  Object.entries(providerUsernamesValues).map(([provider]) => (
                    <Box key={provider}>
                      <ControlledTextField
                        size="small"
                        name={`providerUsernames.${provider}`}
                        label={`${
                          provider.charAt(0).toUpperCase() + provider.slice(1)
                        } Username`}
                        disabled={isLoading || isSubmitLoading}
                      />
                    </Box>
                  ))}
              </Stack>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading || !isDirty || isSubmitLoading}
              >
                Save Changes
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </>
  );
};

export default UserSettings;
