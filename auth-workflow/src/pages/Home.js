import React from "react";

import Nav from "../components/Nav";
import Body from "../components/Body";
import { useGlobalContext } from "../context.js";
const Home = () => {
  return (
    <>
      <div>
        <Nav />
        <Body />
      </div>
    </>
  );
};

export default Home;
