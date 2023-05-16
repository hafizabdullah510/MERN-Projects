import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { Button } from "@mui/material";
import { verifyEmail } from "../services/api.js";
import { Link, useLocation } from "react-router-dom";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Verify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const query = useQuery();

  const verifyToken = async () => {
    setIsLoading(true);
    const verificationToken = query.get("token");
    const email = query.get("email");
    const response = await verifyEmail(verificationToken, email);
    setResponse(response.data.msg);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      verifyToken();
    }
  }, []);

  console.log(response);
  return (
    <>
      <Nav />
      {isLoading ? (
        <div className="user-cont">
          <div className="user-info-cont">
            <h1>Confirmation Pending</h1>
          </div>
        </div>
      ) : (
        <div className="user-cont">
          <div className="user-info-cont">
            <h1>Account Confirmed</h1>
            <Link className="react-link" to="/login">
              <Button size="small" variant="contained">
                Please Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Verify;
