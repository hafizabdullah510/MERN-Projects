import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useGlobalContext } from "../context.js";

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

const Register = () => {
  const { handleValueChange, submitUser, loading, alert, user } =
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
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              variant="solid"
              id="name"
              name="name"
              value={user.name}
              onChange={(e) => handleValueChange(e)}
            />
          </FormControl>
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
              name="password"
              value={user.password}
              onChange={(e) => handleValueChange(e)}
            />
          </FormControl>
          <FormControl>
            <Button variant="contained" onClick={(e) => submitUser(e)}>
              {loading ? "Loading..." : "Register"}
            </Button>
          </FormControl>
          <FormControl>
            <div className="login-link">
              <p>
                Already have an account?<a href="/login">Log in</a>
              </p>
            </div>
          </FormControl>
        </Form>
      </div>
    </>
  );
};

export default Register;
