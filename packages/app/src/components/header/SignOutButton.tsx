import React from "react";
import { Button } from "@material-ui/core";
import Axios from "axios";

export default function SignOutButton() {
  async function handleClick() {
    console.log("sign out");
    const res = await Axios.post(
      "http://localhost:4000/auth/sign-out",
      {},
      { withCredentials: true },
    );
    console.log(res);
  }

  return (
    <Button type="submit" onClick={handleClick}>
      Sign Out
    </Button>
  );
}
