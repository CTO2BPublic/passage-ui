import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'src/utils/axiosInstance';
import endpoints from 'src/utils/endpoints';
import { AxiosError, AxiosResponse } from 'axios';
import queryClient from 'src/utils/queryClient';
import { SnackbarContext } from 'src/contexts/SnackBar';
import { AccessRequest } from 'src/types';
import { useContext } from 'react';

const deleteSystemAccessRequest = async (id: string) =>
  await axiosInstance.delete(endpoints.accessRequest(id));

export const useDeleteAccessRequest = () => {
  const { showErrorSnackbar, showSuccessSnackbar } =
    useContext(SnackbarContext);

  return useMutation<
    AxiosResponse<{ title?: string }>,
    AxiosError<{ title?: string }>,
    string
  >({
    mutationKey: ['DeleteAccessRequest'],
    mutationFn: (id) => deleteSystemAccessRequest(id),
    onSuccess: (responsePayload, id) => {
      queryClient.setQueryData(
        ['AccessRequests'],
        (existingValues: AccessRequest[]) =>
          existingValues.filter((existingValue) => existingValue.id !== id),
      );
      showSuccessSnackbar(responsePayload.data.title);
    },
    onError: (error) => {
      showErrorSnackbar(error.response?.data);
    },
  });
};
