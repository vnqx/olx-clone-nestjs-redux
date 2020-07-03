import React from "react";
import { TextField, TextFieldProps } from "@material-ui/core";
import { useField } from "formik";

interface UseFieldProps {
  name: string;
  type: string;
}

type Props = TextFieldProps & UseFieldProps;

export default function MyTextField(props: Props): React.ReactElement {
  const { name, type } = props;

  const [field, { error: formikError, touched }] = useField({ name, type });

  const error = touched && formikError;

  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="normal"
      {...field}
      {...props}
      error={!!error}
      helperText={error}
    />
  );
}
