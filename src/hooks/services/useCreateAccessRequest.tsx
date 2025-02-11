import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'src/utils/axiosInstance';
import endpoints from 'src/utils/endpoints';
import { AxiosError, AxiosResponse } from 'axios';
import queryClient from 'src/utils/queryClient';
import { AccessRequest } from 'src/types';
import { useContext } from 'react';
import { SnackbarContext } from 'src/contexts/SnackBar';

const createAccessRequest = async (values: Partial<AccessRequest>) =>
  await axiosInstance.post(endpoints.accessRequests, values);

export const useCreateAccessRequest = () => {
  const { showErrorSnackbar, showSuccessSnackbar } =
    useContext(SnackbarContext);

  return useMutation<
    AxiosResponse<{ title?: string }>,
    AxiosError<{ title?: string }>,
    Partial<AccessRequest>
  >({
    mutationKey: ['CreateAccessRequest'],
    mutationFn: (values) => createAccessRequest(values),
    onSuccess: async (responsePayload, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['AccessRequests', variables.id],
      });
      showSuccessSnackbar(responsePayload.data.title);
    },
    onError: (error) => {
      showErrorSnackbar(error.response?.data);
    },
  });
};
