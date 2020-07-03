import React from "react";
import { Formik, Field, Form } from "formik";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import useSignUpForm from "../../hooks/useSignUpForm";

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
            placeholder="First name"
          />
          <Field
            name="lastName"
            type="text"
            label="Last name"
            placeholder="Last name"
          />
          <Field name="email" type="email" label="Email" placeholder="Email" />
          <Field
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
          />
          <Field
            name="passwordConfirm"
            type="password"
            label="Confirm password"
            placeholder="Confirm password"
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
              <Link to="/auth/sign-in">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
