import React from "react";
import { Formik, Form } from "formik";
import {
  Button,
  makeStyles,
  Grid,
  Link as MLink,
  Theme,
  createStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useSignUpForm from "../../hooks/useSignUpForm";
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
          <MyTextField
            name="firstName"
            type="text"
            label="First name"
            autoFocus
          />
          <MyTextField name="lastName" type="text" label="Last name" />
          <MyTextField name="email" type="email" label="Email" />{" "}
          <MyTextField name="password" type="text" label="Password" />
          <MyTextField
            name="passwordConfirm"
            type="text"
            label="Confirm password"
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
              <MLink component={Link} to="/auth/sign-in">
                Already have an account? Sign In
              </MLink>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
