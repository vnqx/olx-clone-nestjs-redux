import React from "react";
import { Formik, Field, Form } from "formik";
import {
  Button,
  makeStyles,
  Grid,
  createStyles,
  Theme,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useSignInForm from "../../hooks/useSignInForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }),
);

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
              <Link to="/auth/sign-up">
                Don&apos;t have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
