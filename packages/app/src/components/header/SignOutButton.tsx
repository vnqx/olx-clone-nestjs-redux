import React from "react";
import { Button } from "@material-ui/core";
import Axios from "axios";

export default function SignOutButton(): React.ReactElement {
  async function handleClick() {
    const { data } = await Axios.post(
      "http://localhost:4000/auth/sign-out",
      {},
      { withCredentials: true },
    );
  }

  return (
    <Button type="submit" onClick={handleClick}>
      Sign Out
    </Button>
  );
}
