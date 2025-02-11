import { useMemo } from 'react';
import { searchInData } from 'src/utils/helpers';

function useSearch<T>(data: T[] = [], query: string): T[] {
  return useMemo(() => {
    if (!query) {
      return data;
    }

    return data.filter((item) => searchInData(item, query));
  }, [data, query]);
}

export default useSearch;
