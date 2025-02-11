import { useQuery } from '@tanstack/react-query';
import { User } from 'src/types';
import axiosInstance from 'src/utils/axiosInstance';
import endpoints from '../../utils/endpoints';

const fetchUser = async (): Promise<User> => {
  const { data } = await axiosInstance.get(endpoints.user);
  return data;
};

export const useFetchUser = () => {
  return useQuery<User, Error>({
    queryKey: ['User'],
    queryFn: fetchUser,
    staleTime: Infinity,
  });
};
