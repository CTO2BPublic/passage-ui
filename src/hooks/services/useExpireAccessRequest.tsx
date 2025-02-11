import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'src/utils/axiosInstance';
import endpoints from 'src/utils/endpoints';
import { AxiosError, AxiosResponse } from 'axios';
import queryClient from 'src/utils/queryClient';
import { SnackbarContext } from 'src/contexts/SnackBar';
import { useContext } from 'react';

const expireAccessRequest = async (id: string) =>
  await axiosInstance.post(endpoints.accessRequestExpire(id));

export const useExpireAccessRequest = () => {
  const { showErrorSnackbar, showSuccessSnackbar } =
    useContext(SnackbarContext);

  return useMutation<
    AxiosResponse<{ title?: string }>,
    AxiosError<{ title?: string }>,
    string
  >({
    mutationKey: ['ExpireAccessRequest'],
    mutationFn: (id) => expireAccessRequest(id),
    onSuccess: async (responsePayload) => {
      await queryClient.invalidateQueries({
        queryKey: ['AccessRequests'],
      });
      showSuccessSnackbar(responsePayload.data.title);
    },
    onError: (error) => {
      showErrorSnackbar(error.response?.data);
    },
  });
};
