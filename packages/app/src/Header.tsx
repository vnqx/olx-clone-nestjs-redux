import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="sign-in">Sign In</Link>
      <Link to="sign-up">Sign Up</Link>
    </div>
  );
}
