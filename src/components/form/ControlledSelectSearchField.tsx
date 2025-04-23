import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
  TextFieldProps,
} from '@mui/material';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label?: string;
  options?: {
    label: string;
    value: string;
  }[];
  disabled?: boolean;
  size?: TextFieldProps['size'];
};

const ControlledSelectSearchField: React.FC<Props> = ({
  name,
  size,
  options = [],
  disabled = false,
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const [inputValue, setInputValue] = React.useState('');

  return (
    <FormControl variant="standard" fullWidth disabled={disabled}>
      <Autocomplete
        id={name}
        value={field.value}
        onChange={(_, newValue) => field.onChange(newValue)}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={options.map((option) => option.value)}
        renderInput={(params) => {
          return <TextField {...params} variant="outlined" size={size} />;
        }}
        disabled={disabled}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default ControlledSelectSearchField;
