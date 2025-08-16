import { useQuery } from '@tanstack/react-query';
import { ActivityLog } from 'src/types';
import axiosInstance from 'src/utils/axiosInstance';
import endpoints from 'src/utils/endpoints';

const fetchActivityLogs = async (): Promise<ActivityLog[]> => {
  const { data } = await axiosInstance.get(endpoints.activityLogs);
  return data;
};

export const useFetchActivityLogs = () => {
  return useQuery<ActivityLog[], Error>({
    queryKey: ['ActivityLogs'],
    queryFn: fetchActivityLogs,
  });
};
