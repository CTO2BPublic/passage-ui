import { useController, useFormContext } from 'react-hook-form';
import { TextField, FormControl, Autocomplete } from '@mui/material';
import { FC } from 'react';

interface ControlledAutoCompleteProps {
  name: string;
  label: string;
  options: { value: string | number; label: string }[];
  all?: boolean;
  size?: 'small' | 'medium';
  helperText?: string;
  disabled?: boolean;
}

const ControlledAutoComplete: FC<ControlledAutoCompleteProps> = ({
  name,
  label,
  options = [],
  size,
  helperText = '',
  disabled = false,
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormControl fullWidth error={!!error} size={size} disabled={disabled}>
      <Autocomplete
        size={size}
        options={options.map((option) => option.label)}
        freeSolo
        value={field.value || ''}
        onChange={(_, newValue) => field.onChange(newValue)}
        onInputChange={(_, newInputValue) => field.onChange(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={!!error}
            helperText={error ? error.message : helperText}
            disabled={disabled}
          />
        )}
      />
    </FormControl>
  );
};

export default ControlledAutoComplete;
