import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";
const Sidebar_link = ({
  id,
  icon,
  text,
  selectedIndex,
  handleClick,
  studentCourses,
}) => {
  const navigate = useNavigate();
  const { getSingleCourse } = useGlobalContext();
  const [visibleCourses, setVisibleCourses] = useState(false);
  const divRef = useRef(null);
  useEffect(() => {
    if (divRef.current) {
      const div = divRef.current;
      div.style.height = visibleCourses ? `${div.scrollHeight}px` : "0px";
    }
  }, [visibleCourses]);

  const getCourseDetails = (courseId) => {
    navigate("course-details");
    getSingleCourse(courseId);
  };
  return (
    <>
      <div
        className={
          id === selectedIndex
            ? "sidebar_link_cont selected"
            : "sidebar_link_cont"
        }
        onClick={() => handleClick(id)}
      >
        {icon}
        <h5>{text}</h5>
        {text === "Courses" && (
          <AiFillCaretDown
            style={{ marginLeft: "100px" }}
            color="white"
            onClick={() => setVisibleCourses(!visibleCourses)}
          />
        )}
      </div>
      {id === 5 && (
        <div className="courses-expand-cont" ref={divRef}>
          {studentCourses &&
            studentCourses.map((course) => {
              const { _id, name } = course;
              return (
                <div
                  className="course-div"
                  key={_id}
                  onClick={() => getCourseDetails(_id)}
                >
                  {name}
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default Sidebar_link;
