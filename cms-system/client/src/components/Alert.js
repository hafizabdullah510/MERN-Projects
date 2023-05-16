import React from "react";
import { useGlobalContext } from "../context/AppContext";
const Alert = () => {
  const { alertText, alertType } = useGlobalContext();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;
