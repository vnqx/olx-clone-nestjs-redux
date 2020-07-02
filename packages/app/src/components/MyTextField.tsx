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

  const [field, { error, touched }] = useField({ name, type });

  const isError = (error && touched) as boolean;

  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="normal"
      {...field}
      {...props}
      error={isError}
      helperText={isError && error}
    />
  );
}
