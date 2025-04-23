import { useQuery } from '@tanstack/react-query';
import { UsersRoleMapping } from 'src/types';
import axiosInstance from 'src/utils/axiosInstance';
import endpoints from '../../utils/endpoints';

const fetchUsersRoleMapping = async (): Promise<UsersRoleMapping[]> => {
  const { data } = await axiosInstance.get(endpoints.users);
  return data;
};

export const useFetchUsersRoleMapping = ({ enabled }: { enabled: boolean }) => {
  return useQuery<UsersRoleMapping[], Error>({
    queryKey: ['UsersRoleMapping'],
    queryFn: fetchUsersRoleMapping,
    enabled,
  });
};
