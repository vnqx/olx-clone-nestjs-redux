import React from "react";
import { Button } from "@material-ui/core";
import { signOut } from "../../reducers/meReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SignOutButton(): React.ReactElement {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleClick() {
    dispatch(signOut(navigate));
  }

  return (
    <Button type="submit" onClick={handleClick}>
      Sign Out
    </Button>
  );
}
