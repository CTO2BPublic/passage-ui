import {
  useController,
  useFormContext,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import { ReactNode } from 'react';

interface ControlledTextFieldProps<T extends FieldValues>
  extends Omit<TextFieldProps, 'name'> {
  name: FieldPath<T>;
  label: string;
  startIcon?: ReactNode;
}

const ControlledTextField = <T extends FieldValues>({
  name,
  label,
  startIcon,
  ...props
}: ControlledTextFieldProps<T>) => {
  const { control } = useFormContext<T>();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      {...field}
      {...props}
      label={label}
      error={!!error}
      helperText={error ? error.message : props.helperText}
      fullWidth
      slotProps={{
        input: {
          startAdornment: startIcon ? (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
};

export default ControlledTextField;
