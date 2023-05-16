import React from "react";
import logo from "../assets/logo.svg";
import { Button } from "@mui/material";
import { useGlobalContext } from "../context.js";

import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const { loggedInUser, logout_User } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <nav>
      <div className="nav-cont">
        <Link to="/">
          <img src={logo} />
        </Link>
        {loggedInUser && (
          <div className="nav-right">
            <p>
              {loggedInUser
                ? `Hello, ${loggedInUser.name.toUpperCase()}`
                : "Loading..."}
            </p>
            <Button
              size="small"
              variant="contained"
              onClick={() => logout_User(navigate)}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
