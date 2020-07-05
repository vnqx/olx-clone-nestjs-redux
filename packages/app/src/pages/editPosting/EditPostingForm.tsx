import React from "react";
import { Formik, Form } from "formik";
import {
  Button,
  makeStyles,
  createStyles,
  Theme,
  InputAdornment,
} from "@material-ui/core";
import MyTextField from "../../components/MyTextField";
import ConditionField from "../createPosting/ConditionField";
import UploadPhotosField from "../createPosting/UploadPhotosField";
import useEditPosting from "../../hooks/useEditPosting";
import { postingFormValidationSchema } from "../../common/postingFormValidationSchema";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }),
);

export default function EditPostingForm(): React.ReactElement {
  const classes = useStyles();
  const { initialValues, handleSubmit } = useEditPosting();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={postingFormValidationSchema}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form noValidate className={classes.form}>
          <MyTextField name="title" type="text" label="Title" autoFocus />
          <MyTextField
            name="price"
            type="number"
            label="Price"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <ConditionField />
          <MyTextField
            name="description"
            type="text"
            label="Description"
            multiline
            rows={5}
          />
          <MyTextField name="phone" type="tel" label="Phone" />
          <MyTextField name="city" type="text" label="City" />
          <UploadPhotosField name="photos" />
          <Button
            color="primary"
            size="large"
            variant="contained"
            type="submit"
            fullWidth
            className={classes.submit}
            disabled={isSubmitting}
          >
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
}
