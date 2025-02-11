import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'src/utils/axiosInstance';
import endpoints from 'src/utils/endpoints';
import { AxiosError, AxiosResponse } from 'axios';
import queryClient from 'src/utils/queryClient';
import { SnackbarContext } from 'src/contexts/SnackBar';
import { useContext } from 'react';

const approveAccessRequest = async (id: string) =>
  await axiosInstance.post(endpoints.accessRequestApprove(id));

export const useApproveAccessRequest = () => {
  const { showErrorSnackbar, showSuccessSnackbar } =
    useContext(SnackbarContext);

  return useMutation<
    AxiosResponse,
    AxiosError<{ title?: string; error?: string } | undefined>,
    string
  >({
    mutationKey: ['ApproveAccessRequest'],
    mutationFn: (id) => approveAccessRequest(id),
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
