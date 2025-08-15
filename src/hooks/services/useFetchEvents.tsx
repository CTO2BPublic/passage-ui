import { useQuery } from '@tanstack/react-query';
import { Event } from 'src/types';
import axiosInstance from 'src/utils/axiosInstance';
import endpoints from '../../utils/endpoints';

const fetchEvents = async (): Promise<Event[]> => {
  const { data } = await axiosInstance.get(endpoints.events);
  return data;
};

export const useFetchEvents = () => {
  return useQuery<Event[], Error>({
    queryKey: ['Events'],
    queryFn: fetchEvents,
  });
};
