import React from "react";
import Wrapper from "../assets/StudentWrappers/NotificationWrapper";
const Notification = ({ title, description, course_name }) => {
  return (
    <Wrapper>
      <div className="title-cont">
        <h5>{course_name}</h5>

        <h5>{title}</h5>
      </div>
      <p>{description && description}</p>
    </Wrapper>
  );
};

export default Notification;
