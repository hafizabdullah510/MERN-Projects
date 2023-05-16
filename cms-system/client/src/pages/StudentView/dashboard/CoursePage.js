import React, { useEffect } from "react";
import Wrapper from "../../../assets/StudentWrappers/CourseWrapper";
import { Navbar, Loading } from "../../../components/components";
import { useGlobalContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";

const CoursePage = () => {
  const navigate = useNavigate();

  const { courseLoading, singleCourse, courseInstructors } = useGlobalContext();
  console.log(singleCourse, courseInstructors);
  const {
    name,
    description,
    course_code,
    credit_hours,
    has_lab_credits,
    pre_requisites,
  } = singleCourse;
  useEffect(() => {
    if (courseInstructors.length === 0 && !courseLoading) {
      console.log(courseInstructors.length);
      navigate("/");
    }
  }, []);
  return (
    <Wrapper>
      <Navbar title="Course Details" />
      {courseLoading ? (
        <Loading center />
      ) : (
        <div className="container">
          <div className="left-cont">
            <h4>{name && name}</h4>
            <div className="desc-cont">
              <h5>Description</h5>
              <p>{description && description}</p>
            </div>
            <div className="instructors-cont">
              <h5>Instructors</h5>
              {courseInstructors.length > 0 && (
                <div className="instructors-list-cont">
                  {courseInstructors.map((instructor, index) => {
                    const { fullName } = instructor;
                    return (
                      <div className="instructor-div" key={index}>
                        {fullName}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          {singleCourse && (
            <div className="right-cont">
              <h5>
                Course Code : <span>{course_code}</span>
              </h5>
              <h5>
                Credit Hours:{" "}
                <span>
                  {has_lab_credits ? `${credit_hours - 1},1` : credit_hours}
                </span>
              </h5>
              <h5>
                Lab: <span>{has_lab_credits ? "Yes" : "No"}</span>
              </h5>

              <div className="pre-req-cont">
                <h5>Pre-requisites:</h5>
                {pre_requisites.length > 0 && (
                  <ul>
                    {pre_requisites.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default CoursePage;
