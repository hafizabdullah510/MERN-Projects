import React, { useState } from "react";
import Nav from "../components/Nav";
import { useGlobalContext } from "../context.js";
import { useNavigate } from "react-router-dom";

import {
  FormGroup,
  FormControl,
  Input,
  FormLabel,
  Button,
} from "@mui/material";
import styled from "@emotion/styled";

const Form = styled(FormGroup)({
  backgroundColor: "white",
  padding: "1rem 2rem",
  width: "400px",
  gap: "20px",
  borderRadius: "0.5rem",
});

const Login = () => {
  const navigate = useNavigate();

  const { user, handleValueChange, login_User, loading, alert, loggedInUser } =
    useGlobalContext();

  const { type, show, text } = alert;
  return (
    <>
      <Nav />
      <div className="form-cont">
        {show && (
          <div
            className={
              type === "danger" ? "check-email-cont error" : "check-email-cont"
            }
          >
            {`${text}`}
          </div>
        )}
        <Form>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="text"
              id="email"
              value={user.email}
              name="email"
              onChange={(e) => handleValueChange(e)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              value={user.password}
              name="password"
              onChange={(e) => handleValueChange(e)}
            />
          </FormControl>
          <FormControl>
            <Button
              variant="contained"
              onClick={(e) => login_User(e, navigate)}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </FormControl>
          <FormControl>
            <div className="register-link">
              <p>
                Don't have an account?<a href="/register">Sign up</a>
              </p>
              <p>
                Forgot your password?
                <a href="/forgot-password">Reset Password</a>
              </p>
            </div>
          </FormControl>
        </Form>
      </div>
    </>
  );
};

export default Login;
