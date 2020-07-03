import React from "react";
import Postings from "./home/Postings";
import Search from "./home/Search";

export default function Home(): React.ReactElement {
  return (
    <div>
      <Search />
      <Postings />
    </div>
  );
}
