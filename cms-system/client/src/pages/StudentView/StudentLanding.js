import React, { useEffect, useState } from "react";
import Wrapper from "../../assets/StudentWrappers/LandingWrapper";
import logo from "../../assets/images/login.png";
import logoSvg from "../../assets/images/login_svg.svg";
import { FormRow, Alert } from "../../components/components";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useGlobalContext } from "../../context/AppContext";
const StudentLanding = () => {
  const { loginStudent, showAlert, displayAlert, isLoading, student } =
    useGlobalContext();
  const navigate = useNavigate();
  const [studentCredentials, setStudentCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (student) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [student]);

  const handSubmit = (e) => {
    e.preventDefault();
    const { email, password } = studentCredentials;
    if (!email || !password) {
      displayAlert();
    }
    const student = { email, password };
    loginStudent(student);
    setStudentCredentials({ ...studentCredentials, email: "", password: "" });
  };

  const handleInput = (e) => {
    setStudentCredentials({
      ...studentCredentials,
      [e.target.name]: e.target.value,
    });
  };
  console.log(showAlert);
  return (
    <React.Fragment>
      {/* {student && <Navigate to="/" />} */}
      <Wrapper className="full-page">
        <div className="login-container">
          <img src={logo} width="40px" />
          <form className="login-form">
            {showAlert && <Alert />}
            <FormRow
              name="email"
              id="email"
              labelText="Email"
              type="text"
              value={studentCredentials.email}
              placeholder="Enter Registration Number"
              handleChange={handleInput}
            />
            <FormRow
              name="password"
              id="password"
              labelText="Password"
              type="password"
              value={studentCredentials.password}
              placeholder="Enter Password"
              handleChange={handleInput}
            />
            <button
              className="btn btn-block btn-login"
              type="submit"
              onClick={handSubmit}
              disabled={isLoading}
            >
              Login
            </button>
            <p>
              <a href="#">Forgot your password?</a>
            </p>
          </form>
        </div>
        <div className="svg-cont">
          <h3>Welcome back!</h3>
          <p>Learn, review and analyze faster than ever!</p>

          <img src={logoSvg} />
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default StudentLanding;
