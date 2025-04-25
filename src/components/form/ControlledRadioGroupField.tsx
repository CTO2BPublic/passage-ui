import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';

type RadioOption = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  label?: string;
  options: RadioOption[];
  row?: boolean;
  disabled?: boolean;
};

const ControlledRadioGroupField: React.FC<Props> = ({
  name,
  label,
  options,
  row = false,
  disabled = false,
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormControl
      component="fieldset"
      disabled={disabled}
      error={!!error}
      style={{ marginBottom: 16 }}
    >
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <RadioGroup
        row={row}
        {...field}
        onChange={(e) => field.onChange(e.target.value)}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default ControlledRadioGroupField;
