import { useQuery } from '@tanstack/react-query';
import { AccessRole } from 'src/types';
import axiosInstance from 'src/utils/axiosInstance';
import endpoints from '../../utils/endpoints';

const fetchAccessRoles = async (): Promise<AccessRole[]> => {
  const { data } = await axiosInstance.get(endpoints.accessRoles);
  return data;
};

export const useFetchAccessRoles = () => {
  return useQuery<AccessRole[], Error>({
    queryKey: ['AccessRoles'],
    queryFn: fetchAccessRoles,
  });
};
