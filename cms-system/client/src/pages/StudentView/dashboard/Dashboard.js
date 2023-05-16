import React, { useEffect } from "react";
import {
  Navbar,
  BarChartComponent,
  Notification,
} from "../../../components/components";
import { useGlobalContext } from "../../../context/AppContext";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment";
import Wrapper from "../../../assets/StudentWrappers/DashboardWrapper";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const {
    announcements,
    announcements_search,
    announcements_sort,
    getAllAnnouncements,
    student,
    studentTimetable,
    HandleSidebarIndex,
    dayOfWeek,
    date,
    studentNotifications,
  } = useGlobalContext();
  const value = 3.14;

  useEffect(() => {
    getAllAnnouncements();
  }, [announcements_search, announcements_sort]);
  return (
    <Wrapper>
      <Navbar title="Dashboard" />
      <div className="container">
        <div className="left-cont">
          <div className="gpa-cont">
            <div className="gpa-div">
              <CircularProgressbar
                value={value}
                maxValue={4}
                text={`${value}`}
                className="circular-bar"
              />
              <div className="gpa-info">
                <p>Current Semester</p>
                <h5>Estimated GPA</h5>
              </div>
            </div>
            <div className="cgpa-div">
              <CircularProgressbar
                value={value}
                maxValue={4}
                text={`${value}`}
                className="circular-bar"
              />
              <div className="gpa-info">
                <p>Current Semester</p>
                <h5>Estimated GPA</h5>
              </div>
            </div>
          </div>
          <div className="attendence-cont">
            <h5>Attendence</h5>
            <BarChartComponent />
          </div>
          <div className="notification-cont">
            <h5>Notifications</h5>
            {studentNotifications?.length > 0 ? (
              studentNotifications.slice(0, 4).map((notification) => {
                const { _id } = notification;
                return <Notification key={_id} {...notification} />;
              })
            ) : (
              <div className="no-notifications">
                No Notifications Available!
              </div>
            )}
          </div>
        </div>
        <div className="right-cont">
          <div className="date-cont">
            <p>{dayOfWeek}</p>
            <p className="date">{date}</p>
          </div>
          <div className="timetable-cont">
            <h5>Today's Time Table</h5>
            {studentTimetable.length > 0 ? (
              studentTimetable.map((item) => {
                const {
                  is_lab_slot,
                  room_number,
                  start_time,
                  end_time,
                  day_of_week,
                  course: { name },
                } = item;
                const start = moment(start_time).format("LT").split(" ")[0];
                const end = moment(end_time).format("LT").split(" ")[0];

                return (
                  <div className="lec-cont">
                    <div className="sub_time_cont">
                      <h5>{`${name}${is_lab_slot ? "-Lab" : ""}`}</h5>
                      <p className="time">{`${start} - ${end}`}</p>
                    </div>
                    <h5>{room_number}</h5>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  color: "#1d5c96",
                }}
              >
                No Timetable Today!
              </div>
            )}
          </div>
          <div className="announcements-cont">
            <h5>Announcements</h5>
            {announcements.length > 0 ? (
              announcements.slice(0, 4).map((item, index) => {
                const { title, description } = item;

                return (
                  <div className="single_announcement" key={index}>
                    <h5>{title}</h5>
                    <p>
                      {description.length >= 50
                        ? `${description.substring(0, 50)}...`
                        : `${description}`}
                    </p>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  color: "#1d5c96",
                }}
              >
                No Recent Announcements!
              </div>
            )}
          </div>
          <div className="view-all">
            <Link to="announcements" onClick={() => HandleSidebarIndex(2)}>
              View All
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
