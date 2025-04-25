import { FormProvider, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Modal,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import { useCreateAccessRequest } from 'src/hooks/services/useCreateAccessRequest';
import { AccessRequest } from 'src/types';
import React from 'react';
import ControlledTextField from 'src/components/form/ControlledTextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFetchAccessRoles } from 'src/hooks/services/useFetchAccessRoles';
import { generateOptions } from 'src/utils/options';
import CloseIcon from '@mui/icons-material/Close';
import paths from 'src/utils/paths';
import { useLocation, useNavigate } from 'react-router-dom';
import ControlledSelectField from 'src/components/form/ControlledSelectField.tsx';

type Props = {
  open: boolean;
  handleClose: () => void;
  initialRoleName?: string;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const schema = yup.object().shape({
  details: yup.object().shape({
    attributes: yup.object(),
    justification: yup.string().required('This field is required'),
    ttl: yup.string().required('This field is required'),
  }),
  roleRef: yup.object().shape({
    name: yup.string().required('This field is required'),
  }),
});

const AccessRequestFormModal: React.FC<Props> = ({
  open,
  handleClose,
  initialRoleName = '',
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const methods = useForm<Partial<AccessRequest>>({
    defaultValues: {
      details: {
        attributes: {},
        justification: '',
        ttl: '',
      },
      roleRef: {
        name: initialRoleName,
      },
    },
    resolver: yupResolver(schema as yup.ObjectSchema<Partial<AccessRequest>>),
  });

  const { mutate, isPending: isSubmitLoading } = useCreateAccessRequest();

  const { data, isLoading: isRolesLoading } = useFetchAccessRoles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="access-request-modal-title"
      aria-describedby="access-request-modal-description"
    >
      <Stack sx={style} gap={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            id="access-request-modal-title"
            variant="h6"
            component="h2"
          >
            New Access Request
          </Typography>
          <IconButton
            onClick={handleClose}
            aria-label="Close access request form"
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((values) => {
              mutate(values, {
                onSuccess: () => {
                  if (location.pathname !== paths.accessRequests)
                    navigate(paths.accessRequests);
                  handleClose();
                },
              });
            })}
          >
            <Stack spacing={2}>
              <ControlledSelectField
                name="roleRef.name"
                label="Role Name"
                options={generateOptions(data?.map(({ name }) => name))}
                size="small"
                disabled={
                  isRolesLoading || isSubmitLoading || !!initialRoleName
                }
                aria-labelledby="role-name-field"
                all={false}
              />

              <ControlledTextField
                name="details.ttl"
                label="Expiration Time (TTL)"
                size="small"
                disabled={isSubmitLoading}
                aria-labelledby="ttl-field"
              />

              <ControlledTextField
                name="details.justification"
                label="Justification"
                size="small"
                multiline
                rows={4}
                disabled={isSubmitLoading}
                aria-labelledby="justification-field"
              />

              <Box pt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitLoading}
                  aria-label="Save access request"
                >
                  Save
                </Button>
              </Box>
            </Stack>
          </form>
        </FormProvider>
      </Stack>
    </Modal>
  );
};

export default AccessRequestFormModal;
