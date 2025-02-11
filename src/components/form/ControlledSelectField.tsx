import { useController, useFormContext } from 'react-hook-form';
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  SelectProps,
} from '@mui/material';
import { FC } from 'react';

interface ControlledSelectProps extends Omit<SelectProps, 'name'> {
  name: string;
  label: string;
  options?: { value: string | number; label: string }[];
  all?: boolean;
}

const ControlledSelectField: FC<ControlledSelectProps> = ({
  name,
  label,
  options = [],
  all = false,
  size,
  ...props
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl fullWidth error={!!error} size={size}>
      <InputLabel>{label}</InputLabel>
      <Select {...field} {...props} label={label}>
        {all && <MenuItem value="">All</MenuItem>}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default ControlledSelectField;
