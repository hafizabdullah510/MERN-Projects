import React from "react";
import Wrapper from "../assets/StudentWrappers/AnnouncementItemWrapper";
import moment from "moment";
import { useGlobalContext } from "../context/AppContext";
const AnnouncementItem = ({ title, description, createdAt }) => {
  let date = moment(createdAt).format(`MMMM Do YYYY  h:mm a`);

  return (
    <Wrapper>
      <div className="title-cont">
        <h5>{title}</h5>
        <p>{date}</p>
      </div>
      <div className="description-cont">{description}</div>
    </Wrapper>
  );
};

export default AnnouncementItem;
