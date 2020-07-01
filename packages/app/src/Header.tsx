import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./components/header/SignOutButton";
import { useSelector } from "react-redux";
import { RootState } from "./store";

export default function Header(): React.ReactElement {
  const me = useSelector((state: RootState) => state.me);

  return (
    <div>
      <Link to="/">Home</Link>
      {me ? (
        <SignOutButton />
      ) : (
        <>
          <Link to="sign-in">Sign In</Link>
          <Link to="sign-up">Sign Up</Link>
        </>
      )}
    </div>
  );
}
