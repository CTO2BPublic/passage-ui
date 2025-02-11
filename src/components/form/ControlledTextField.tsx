import {
  useController,
  useFormContext,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface ControlledTextFieldProps<T extends FieldValues>
  extends Omit<TextFieldProps, 'name'> {
  name: FieldPath<T>;
  label: string;
}

const ControlledTextField = <T extends FieldValues>({
  name,
  label,
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
    />
  );
};

export default ControlledTextField;
