import React from "react";
import { Formik, Form } from "formik";
import { Button, makeStyles, createStyles, Theme } from "@material-ui/core";
import useCreatePosting from "../../hooks/useCreatePosting";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
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

export default function CreatePostingForm(): React.ReactElement {
  const classes = useStyles();
  const { initialValues, handleSubmit, validationSchema } = useCreatePosting();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form noValidate className={classes.form}>
          {/* <MyTextField name="title" type="title" label="Title" autoFocus />
          <MySelect
            name="category"
            type="text"
            label="Category"
            selectValues={CATEGORIES}
          />
          <MyTextField
            name="description"
            type="text"
            label="Description"
            multiline
            rows={5}
          />
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
          <MySelect
            name="condition"
            type="text"
            label="Condition"
            selectValues={CONDITIONS}
          />
          <MyTextField name="phone" type="tel" label="Phone" />
          <MyTextField name="city" type="text" label="City" />
          <MyUploadField name="urls" /> */}
          <Button
            color="primary"
            size="large"
            variant="contained"
            type="submit"
            fullWidth
            className={classes.submit}
            disabled={isSubmitting}
          >
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
}
