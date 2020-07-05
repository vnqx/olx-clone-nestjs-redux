import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
  },
}));

function Copyright(): React.ReactElement {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Contact at{" "}
      <Link href="https://github.com/vnqx" target="_blank">
        github.com/vnqx
      </Link>{" "}
      . NO TIME FOR SIGN UP?: demo@gmail.com:Demo1234
    </Typography>
  );
}

export default function Footer(): React.ReactElement {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </footer>
  );
}
