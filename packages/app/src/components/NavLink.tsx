import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

interface Props {
  to: string;
  text: string;
}

export default function NavLink({ to, text }: Props): React.ReactElement {
  return (
    <Link to={to}>
      <Button variant="contained" color="primary">
        {text}
      </Button>
    </Link>
  );
}
