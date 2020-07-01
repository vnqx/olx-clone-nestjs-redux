import React from "react";
import { Formik, Field, Form } from "formik";
import { Button, makeStyles, Grid, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import useSignUpForm from "./hooks/useSignUpForm";

const useStyles = makeStyles(() => ({
  root: {},
  form: {},
  submit: {},
}));

export default function SignUpForm(): React.ReactElement {
  const classes = useStyles();
  const { initialValues, handleSubmit, validationSchema } = useSignUpForm();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form noValidate className={classes.form}>
          <Field
            name="firstName"
            type="text"
            label="First name"
            component={TextField}
          />
          <Field
            name="lastName"
            type="text"
            label="Last name"
            component={TextField}
          />
          <Field
            name="email"
            type="email"
            label="Email"
            component={TextField}
          />
          <Field
            name="password"
            type="password"
            label="Password"
            component={TextField}
          />
          <Field
            name="passwordConfirm"
            type="password"
            label="Confirm password"
            component={TextField}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/sign-in">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
