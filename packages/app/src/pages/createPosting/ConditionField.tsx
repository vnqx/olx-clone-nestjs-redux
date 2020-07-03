import React from "react";
import { useField } from "formik";
import { TextField, MenuItem } from "@material-ui/core";
import { Condition } from "../../enums";

export default function ConditionField(): React.ReactElement {
  const [field, { error: formikError, touched }] = useField({
    name: "condition",
    type: "text",
  });

  const error = touched && formikError;

  // TODO figure out a way to do it better
  const conditions = [Condition.New, Condition.Used];

  return (
    <TextField
      select
      label="Condition"
      variant="outlined"
      fullWidth
      error={!!error}
      helperText={error}
      margin="normal"
      {...field}
    >
      {conditions.map((condition) => (
        <MenuItem key={condition} value={condition}>
          {condition}
        </MenuItem>
      ))}
    </TextField>
  );
}
