import React from "react";
import { Button, styled } from "@mui/material";
import main from "../assets/main.svg";
import { Link } from "react-router-dom";
const Body = () => {
  return (
    <main>
      <div className="main-cont">
        <div className="left-cont">
          <h1>
            <span>Auth</span>Workflow
          </h1>
          <div className="body-info-cont">
            <p>
              Fibromyalgia can be a painful and debilitating health condition
              that drastically decreases your overall quality of life. There is
              also a constant search to find an alternative treatement.
            </p>
            <p>
              Fibromyalgia can be a painful and debilitating health condition
              that drastically decreases your overall quality of life. There is
              also a constant search to find an alternative treatement.
            </p>
          </div>
          <div className="btn-cont">
            <Link className="react-link" to="/login">
              <Button variant="contained">Login</Button>
            </Link>
            <Link className="react-link" to="/register">
              <Button variant="contained">Register</Button>
            </Link>
          </div>
        </div>
        <div className="right-cont">
          <img src={main} width={500} />
        </div>
      </div>
    </main>
  );
};

export default Body;
