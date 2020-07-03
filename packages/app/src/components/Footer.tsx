import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
  },
}));

function Copyright(): React.ReactElement {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright © Clolx {new Date().getFullYear()}.
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
