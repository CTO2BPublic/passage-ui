import { useQuery } from '@tanstack/react-query';
import { AccessRequest } from 'src/types';
import axiosInstance from 'src/utils/axiosInstance';
import endpoints from '../../utils/endpoints';

const fetchAccessRequests = async (): Promise<AccessRequest[]> => {
  const { data } = await axiosInstance.get(endpoints.accessRequests);
  return data;
};

export const useFetchAccessRequests = () => {
  return useQuery<AccessRequest[], Error>({
    queryKey: ['AccessRequests'],
    queryFn: fetchAccessRequests,
  });
};
