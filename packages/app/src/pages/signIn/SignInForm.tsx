import React from "react";
import { Formik, Form } from "formik";
import {
  Button,
  makeStyles,
  Grid,
  createStyles,
  Theme,
  Link as MLink,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useSignInForm from "../../hooks/useSignInForm";
import MyTextField from "../../components/MyTextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      padding: theme.spacing(0, 3, 2),
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
          <MyTextField name="email" type="email" label="Email" />
          <MyTextField name="password" type="password" label="Password" />
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
              <MLink component={Link} to="/auth/sign-up">
                Don&apos;t have an account? Sign Up
              </MLink>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
