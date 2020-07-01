import React from "react";
import { Formik, Field, Form } from "formik";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import useSignInForm from "../../hooks/useSignInForm";

const useStyles = makeStyles(() => ({
  root: {},
  form: {},
  submit: {},
}));

export default function SignInForm(): React.ReactElement {
  const classes = useStyles();
  const { initialValues, handleSubmit, validationSchema } = useSignInForm();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form noValidate className={classes.form}>
          <Field name="email" type="email" label="Email" placeholder="Email" />
          <Field
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSubmitting}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/sign-up">Don&apos;t have an account? Sign up</Link>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
