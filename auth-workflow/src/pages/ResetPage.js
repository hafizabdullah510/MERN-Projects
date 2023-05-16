import React from "react";
import Nav from "../components/Nav";
import { useLocation, useNavigate } from "react-router-dom";
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

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

const ResetPage = () => {
  const { resetPassword, user, handleValueChange, alert, loading } =
    useGlobalContext();
  const { type, text, show } = alert;
  const query = useQuery();
  const navigate = useNavigate();

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
          <Heading variant="h5">Reset Password</Heading>
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
              disabled={loading}
              onClick={(e) => resetPassword(e, query, navigate)}
            >
              New Password
            </Button>
          </FormControl>
        </Form>
      </div>
    </>
  );
};

export default ResetPage;
