import React, { useState, useEffect } from "react";
import { Navbar, Loading } from "../../../components/components";
import Wrapper from "../../../assets/StudentWrappers/MarksWrapper";
import { useGlobalContext } from "../../../context/AppContext";
import moment from "moment";
const Marks = () => {
  const {
    getCourseAssessment,
    studentCourses,
    assessmentLoading,
    singleTypeAssessment,
    getSingleAssessment,
    selectedType,
  } = useGlobalContext();
  const [courseTitle, setCourseTitle] = useState("");

  useEffect(() => {
    if (studentCourses.length > 0) {
      getCourseAssessment(studentCourses[0]._id);
      setCourseTitle(studentCourses[0].name);
    }
  }, []);

  const filterCourseAssessment = (type) => {
    getSingleAssessment(type);
  };

  const getAssessment = (id, name) => {
    setCourseTitle(name);
    getCourseAssessment(id);
  };
  return (
    <Wrapper>
      <Navbar title="Marks" />
      {assessmentLoading ? (
        <Loading center />
      ) : (
        <div className="container">
          <div className="subjects-cont">
            {studentCourses.map((course, index) => {
              const { _id, name } = course;

              return (
                <div
                  className="subject-div"
                  key={_id}
                  onClick={() => getAssessment(_id, name)}
                >
                  <p className="title">{name}</p>
                </div>
              );
            })}
          </div>
          <div className="marks-cont">
            <h5>{courseTitle}</h5>
            <div className="assessment-cont">
              <div
                className={
                  selectedType === "assignment"
                    ? "assessment-div selected"
                    : "assessment-div"
                }
                onClick={() => filterCourseAssessment("assignment")}
              >
                Assignments
              </div>
              <div
                className={
                  selectedType === "quiz"
                    ? "assessment-div selected"
                    : "assessment-div"
                }
                onClick={() => filterCourseAssessment("quiz")}
              >
                Quizzes
              </div>
              <div
                className={
                  selectedType === "midterm"
                    ? "assessment-div selected"
                    : "assessment-div"
                }
                onClick={() => filterCourseAssessment("midterm")}
              >
                Midterm
              </div>
              <div
                className={
                  selectedType === "final"
                    ? "assessment-div selected"
                    : "assessment-div"
                }
                onClick={() => filterCourseAssessment("final")}
              >
                Final
              </div>
            </div>
            <div className="table-cont">
              <table>
                <thead className="header">
                  <th className="title">title</th>
                  <th>Obtained Marks</th>
                  <th>Total Marks</th>
                  <th>Date</th>
                </thead>
                <tbody>
                  {singleTypeAssessment?.length > 0 ? (
                    singleTypeAssessment.map((assessment) => {
                      const {
                        assessment_type,
                        title,
                        obtained_marks,
                        total_marks,
                        createdAt,
                      } = assessment;
                      return (
                        <tr>
                          <td>{title}</td>
                          <td>{obtained_marks}</td>
                          <td>{total_marks}</td>
                          <td>{moment(createdAt).format("LL")}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <div className="no-marks">{`No ${selectedType} marks available!`}</div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Marks;
