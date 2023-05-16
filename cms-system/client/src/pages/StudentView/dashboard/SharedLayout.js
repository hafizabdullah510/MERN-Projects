import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../../components/components";
import Wrapper from "../../../assets/StudentWrappers/SharedLayoutWrapper";
const SharedLayout = () => {
  return (
    <Wrapper>
      <Sidebar />
      <div>
        <div className="outlet-cont">
          <Outlet />
        </div>
      </div>
    </Wrapper>
  );
};

export default SharedLayout;
