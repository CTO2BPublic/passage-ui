import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'src/utils/axiosInstance';
import endpoints from 'src/utils/endpoints';
import { AxiosError, AxiosResponse } from 'axios';
import queryClient from 'src/utils/queryClient';
import { User } from 'src/types';
import { useContext } from 'react';
import { SnackbarContext } from 'src/contexts/SnackBar';

const updateUserSettings = async (values: User['settings']) =>
  await axiosInstance.put(endpoints.userSettings, values);

export const useUpdateUserSettings = () => {
  const { showErrorSnackbar, showSuccessSnackbar } =
    useContext(SnackbarContext);

  return useMutation<
    AxiosResponse<{ title?: string }>,
    AxiosError<{ title?: string }>,
    User['settings']
  >({
    mutationKey: ['UpdateUserSettings'],
    mutationFn: (values) => updateUserSettings(values),
    onSuccess: async (responsePayload) => {
      await queryClient.invalidateQueries({
        queryKey: ['User'],
      });
      showSuccessSnackbar(responsePayload.data.title);
    },
    onError: (error) => {
      showErrorSnackbar(error.response?.data);
    },
  });
};
