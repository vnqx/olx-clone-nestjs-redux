import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./components/header/SignOutButton";

export default function Header(): React.ReactElement {
  return (
    <div>
      <Link to="/">Home</Link>
      <SignOutButton />
      <Link to="sign-in">Sign In</Link>
      <Link to="sign-up">Sign Up</Link>
    </div>
  );
}
