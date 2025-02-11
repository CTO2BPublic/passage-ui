import { TextField } from '@mui/material';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}

const Search: FC<Props> = ({ query, setQuery, isLoading }) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      size="small"
      fullWidth
      disabled={isLoading}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default Search;
