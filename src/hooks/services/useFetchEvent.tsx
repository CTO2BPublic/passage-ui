import { useQuery } from '@tanstack/react-query';
import { Event } from 'src/types';
import axiosInstance from 'src/utils/axiosInstance';
import endpoints from 'src/utils/endpoints';

const fetchEvent = async (id: Event['id']): Promise<Event> => {
  const { data } = await axiosInstance.get(endpoints.event(id));
  return data;
};

export const useFetchEvent = (id: Event['id']) => {
  return useQuery<Event, Error>({
    queryKey: ['Event', id],
    queryFn: () => fetchEvent(id),
    enabled: !!id,
  });
};
