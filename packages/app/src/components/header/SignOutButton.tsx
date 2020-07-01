import React from "react";
import { Button } from "@material-ui/core";
import { signOut } from "../../reducers/authReducer";
import { useDispatch } from "react-redux";

export default function SignOutButton(): React.ReactElement {
  const dispatch = useDispatch();
  async function handleClick() {
    dispatch(signOut());
  }

  return (
    <Button type="submit" onClick={handleClick}>
      Sign Out
    </Button>
  );
}
