import Wrapper from "../assets/StudentWrappers/SidebarWrapper";
import logo from "../assets/images/COMSATS_new_logo.jpg";
import React, { useEffect, useState } from "react";
import { Sidebar_link } from "./components";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";

import { links } from "../utils/links";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";
const Sidebar = () => {
  const navigate = useNavigate();
  const {
    sidebarIndex,
    HandleSidebarIndex,
    logoutStudent,
    student,
    studentCourses,
  } = useGlobalContext();
  const { firstName } = student;

  useEffect(() => {
    navigate("/");
    HandleSidebarIndex(1);
  }, []);

  const manageLinks = (id, path) => {
    HandleSidebarIndex(id);
    if (path) {
      navigate(`${path}`);
    }
  };
  return (
    <Wrapper>
      <div className="welcome-cont">
        <img src={logo} className="welcome-img" />
        <div className="name-cont">
          <p>Welcome Back</p>
          <h5>{`${firstName}`}</h5>
        </div>
        <BsArrowRightCircleFill color="white" cursor="pointer" />
      </div>
      {links.map((link, index) => {
        const { id, icon, text, path } = link;
        return (
          <Sidebar_link
            id={id}
            index={index}
            key={id}
            icon={icon}
            text={text}
            selectedIndex={sidebarIndex}
            handleClick={(id) => manageLinks(id, path)}
            studentCourses={studentCourses}
          />
        );
      })}
      <div className="sidebar_link_cont" onClick={() => logoutStudent()}>
        <CgLogOut color="white" />
        <h5>Logout</h5>
      </div>
    </Wrapper>
  );
};

export default Sidebar;
