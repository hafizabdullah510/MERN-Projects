import React from "react";
import Nav from "../components/Nav";
import { useGlobalContext } from "../context.js";
import {
  FormGroup,
  FormControl,
  Input,
  FormLabel,
  Button,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";

const Form = styled(FormGroup)({
  backgroundColor: "white",
  padding: "1rem 2rem",
  width: "400px",
  gap: "20px",
  borderRadius: "0.5rem",
});
const Heading = styled(Typography)({
  alignSelf: "center",
  letterSpacing: "0.1rem",
});

const ForgotPage = () => {
  const { sendResetEmail, user, handleValueChange, alert, loading } =
    useGlobalContext();
  const { type, text, show } = alert;
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
          <Heading variant="h5">Forgot Password</Heading>
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
            <Button
              variant="contained"
              disabled={loading}
              onClick={(e) => sendResetEmail(e)}
            >
              Get Reset Password Link
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

export default ForgotPage;
