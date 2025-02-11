import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

// const handleError = (e) => {
//   if (e?.code === 'ERR_NETWORK') {
//     alert('Something went wrong, please try again later');
//   }
// };

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    // onSuccess: () => console.log('QueryCache'),
    // onError: (e) => {
    //   // console.log('QueryCache error', e);
    //   // @ts-ignore
    //   handleError(e);
    // },
  }),
  mutationCache: new MutationCache({
    // onSuccess: () => console.log('MutationCache'),
    // onError: (e) => {
    //   // console.log('MutationCache error', e);
    //   handleError(e);
    // },
  }),
});

export default queryClient;
