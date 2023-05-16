import React, { useEffect, useState } from "react";
import Wrapper from "../../../assets/StudentWrappers/AttendenceWrapper";
import { Navbar, Loading } from "../../../components/components";
import { useGlobalContext } from "../../../context/AppContext";
import moment from "moment";
const Attendence = () => {
  const [courseTitle, setCourseTitle] = useState("");

  const {
    studentAttendence,
    getCompleteCourseAttendence,
    completeCourseAttendence,
    attendenceLoading,
  } = useGlobalContext();

  useEffect(() => {
    if (studentAttendence.length > 0) {
      getCompleteCourseAttendence(
        studentAttendence[0].course_id,
        studentAttendence[0].is_lab
      );
      setCourseTitle(
        `${studentAttendence[0].course_name}${
          studentAttendence[0].is_lab ? "-Lab" : ""
        }`
      );
    }
  }, []);
  console.log(completeCourseAttendence);

  const handleAttendence = (courseId, is_lab_course) => {
    getCompleteCourseAttendence(courseId, is_lab_course);
    console.log(studentAttendence);
    setCourseTitle(
      studentAttendence.map(
        (item) =>
          item.course_id === courseId &&
          item.is_lab === is_lab_course &&
          `${item.course_name}${item.is_lab ? "-Lab" : ""}`
      )
    );
  };

  if (studentAttendence?.length === 0) {
    return (
      <Wrapper>
        <Navbar title="Attendance" />
        <div className="no-attendance">No Attendance Record Available!</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Navbar title="Attendance" />
      {attendenceLoading ? (
        <Loading center />
      ) : (
        <div className="container">
          <div className="attendence-cont">
            {studentAttendence.map((item) => {
              const { course_id, is_lab, course_name, attendance_percentage } =
                item;
              return (
                <div
                  className="attendence-div"
                  key={course_id}
                  onClick={() => handleAttendence(course_id, is_lab)}
                >
                  <p className="title">{`${course_name}${
                    is_lab ? "-Lab" : ""
                  }`}</p>
                  <p className="percentage">{`${attendance_percentage}%`}</p>
                </div>
              );
            })}
          </div>
          <div className="subject-attendence-cont">
            <h5 className="subject-title">{courseTitle}</h5>
            <div className="table-cont">
              <div className="header">
                <p>Lec</p>
                <p>Date</p>
                <p>Duration</p>
                <p>Status</p>
              </div>
              <div className="attendence-list">
                {completeCourseAttendence.map((item, index) => {
                  const { date, isPresent, is_lab_attendance } = item;
                  return (
                    <div
                      className={
                        isPresent ? "attendence-item" : "attendence-item absent"
                      }
                      key={index}
                    >
                      <div className="lec-no">{index + 1}</div>
                      <div className="date">{moment(date).format("L")}</div>
                      <div className="duration">
                        {is_lab_attendance ? "3h 00m" : "1h 30m"}
                      </div>
                      <div className="status">
                        {isPresent ? "Present" : `Absent`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Attendence;
