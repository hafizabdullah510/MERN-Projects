import React, { useState, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { reducer } from "./reducer/reducer.js";
import { registerUser, loginUser, logoutUser } from "./services/api.js";
const url = "/api/v1/auth";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [componentLoading, setComponentLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "danger", text: "", show: false });

  const handleValueChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`${url}/currentUser`, {
        withCredentials: true,
      });
      setLoggedInUser(data.user);
    } catch (err) {
      setLoggedInUser(null);
    }
    setComponentLoading(false);
  };

  const submitUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, email, password } = user;
    const registerUser = { name, email, password };
    try {
      const resp = await axios.post(`${url}/register`, registerUser, {
        withCredentials: true,
      });
      console.log(resp);
      setUser({ name: "", email: "", password: "" });
      setAlert({
        type: "success",
        text: `${resp.data.msg}`,
        show: true,
      });
      setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 3000);
      setIsLoading(false);
    } catch (err) {
      setAlert({ text: err.response.data.msg, type: "danger", show: true });
      setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 3000);
      setIsLoading(false);
    }

    setIsLoading(false);
    setUser({ name: "", email: "", password: "" });
  };

  const logout_User = async (navigate) => {
    try {
      await axios.delete(`${url}/logout`, { withCredentials: true });
      setLoggedInUser(null);
      setAlert({ type: "", text: "", show: false });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const login_User = async (event, navigate) => {
    event.preventDefault();
    setIsLoading(true);
    setComponentLoading(true);
    const { email, password } = user;
    const loginUser = { email, password };

    try {
      const { data } = await axios.post(`${url}/login`, loginUser, {
        withCredentials: true,
      });
      setUser({ name: "", email: "", password: "" });
      setAlert({
        type: "success",
        text: `Hello ${data.user.name},Redirecting to Dashboard...`,
        show: true,
      });
      setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 3000);
      setComponentLoading(false);
      setLoggedInUser(data.user);
      setIsLoading(false);
      navigate("/user-dashboard");
    } catch (err) {
      setAlert({ text: err.response.data.msg, type: "danger", show: true });
      setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 3000);
      setComponentLoading(false);
      setIsLoading(false);
    }
  };

  const sendResetEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email } = user;
    const forgotUser = { email };
    try {
      const { data } = await axios.post(`${url}/forgot-password`, forgotUser, {
        withCredentials: true,
      });
      setUser({ name: "", email: "", password: "" });
      setAlert({
        type: "success",
        text: `${data.msg}`,
        show: true,
      });
      setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 3000);
      setIsLoading(false);
    } catch (err) {
      setAlert({
        text: err.response.data.msg,
        type: "danger",
        show: true,
      });
      setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 3000);
      setIsLoading(false);
    }
  };

  const resetPassword = async (e, query, navigate) => {
    e.preventDefault();
    setIsLoading(true);
    const { password } = user;
    const token = query.get("token");
    const email = query.get("email");
    const resetUser = { password, token, email };
    try {
      const { data } = await axios.post(
        `${url}/user/reset-password`,
        resetUser,
        {
          withCredentials: true,
        }
      );
      setUser({ name: "", email: "", password: "" });
      setAlert({
        type: "success",
        text: `${data.msg}`,
        show: true,
      });
      setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 3000);
      setIsLoading(false);
      navigate("/login");
    } catch (err) {
      setAlert({
        text: err.response.data.msg,
        type: "danger",
        show: true,
      });
      setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 3000);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        submitUser,
        handleValueChange,
        componentLoading,
        loading: isLoading,
        user,
        alert,
        login_User,
        loggedInUser,
        logout_User,
        sendResetEmail,
        resetPassword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
