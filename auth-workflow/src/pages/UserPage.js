import React from "react";
import { useGlobalContext } from "../context.js";
import Nav from "../components/Nav.js";
const UserPage = () => {
  const { loggedInUser } = useGlobalContext();

  return (
    <>
      <Nav />
      <div className="user-cont">
        <div className="user-info-cont">
          <h1>{`Hello There, ${loggedInUser.name.toUpperCase()}`}</h1>
          <p>
            Your ID:{" "}
            <span className="user-span">{`${loggedInUser.userId}`}</span>
          </p>
          <p>
            Your role:
            <span className="user-span">{`${loggedInUser.role}`}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserPage;
