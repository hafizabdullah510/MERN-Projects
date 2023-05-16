import React from "react";
import Wrapper from "../assets/StudentWrappers/NavbarWrapper";
const Navbar = ({ title }) => {
  return (
    <Wrapper>
      <div className="container">{title}</div>
    </Wrapper>
  );
};

export default Navbar;
