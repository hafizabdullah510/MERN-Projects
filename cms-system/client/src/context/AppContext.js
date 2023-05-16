import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";
import moment from "moment";

import {
  GET_ANNOUNCEMENTS_BEGIN,
  GET_ANNOUNCEMENTS_SUCCESS,
  GET_ANNOUNCEMENTS_ERROR,
  HANDLE_ANNOUNCEMENT,
  HANDLE_SIDEBAR_INDEX,
  LOGIN_STUDENT_BEGIN,
  LOGIN_STUDENT_SUCCESS,
  LOGIN_STUDENT_ERROR,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  CURRENT_STUDENT_BEGIN,
  CURRENT_STUDENT_SUCCESS,
  CURRENT_STUDENT_ERROR,
  LOGOUT_STUDENT,
  STUDENT_TIMETABLE_BEGIN,
  STUDENT_TIMETABLE_SUCCESS,
  STUDENT_TIMETABLE_ERROR,
  GET_SINGLE_COURSE_BEGIN,
  GET_SINGLE_COURSE_SUCCESS,
  GET_SINGLE_COURSE_ERROR,
  STUDENT_ATTENDANCE_BEGIN,
  STUDENT_ATTENDANCE_SUCCESS,
  STUDENT_ATTENDANCE_ERROR,
  CURRENT_STUDENT_COURSES_BEGIN,
  CURRENT_STUDENT_COURSES_SUCCESS,
  CURRENT_STUDENT_COURSES_ERROR,
  GET_DAY_INFO,
  COURSE_ATTENDENCE_BEGIN,
  COURSE_ATTENDENCE_SUCCESS,
  COURSE_ATTENDENCE_ERROR,
  COURSE_ASSESSMENT_BEGIN,
  COURSE_ASSESSMENT_SUCCESS,
  COURSE_ASSESSMENT_ERROR,
  GET_SINGLE_ASSESSMENT,
  STUDENT_NOTIFICATION_BEGIN,
  STUDENT_NOTIFICATION_SUCCESS,
  STUDENT_NOTIFICATION_ERROR,
  DASHBOARD_LOADING_BEGIN,
  DASHBOARD_LOADING_END,
} from "./actions";

const initialState = {
  showAlert: false,
  alertType: "danger",
  alertText: "",
  isLoading: false,
  announcements: [],
  announcements_search: "",
  announcements_sort: "",
  sort_options: ["Latest", "Oldest"],
  sidebarIndex: 1,
  student: null,
  studentCourses: [],
  studentLoading: true,
  courseLoading: true,
  studentTimetable: [],
  singleCourse: {},
  courseInstructors: [],
  studentAttendence: [],
  dayOfWeek: "",
  date: "",
  completeCourseAttendence: [],
  attendenceLoading: true,
  courseAssessment: [],
  singleTypeAssessment: [],
  assessmentLoading: true,
  selectedType: "",
  studentNotifications: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 401) {
        logoutStudent();
      }
      return Promise.reject(error);
    }
  );

  const loginStudent = async (currentStudent) => {
    dispatch({ type: LOGIN_STUDENT_BEGIN });
    try {
      const { data } = await authFetch.post("/student/login", currentStudent);
      const { student } = data;
      dispatch({ type: LOGIN_STUDENT_SUCCESS, payload: { student } });
    } catch (err) {
      dispatch({
        type: LOGIN_STUDENT_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }

    clearAlert();
  };

  const logoutStudent = async () => {
    await authFetch.get("/student/logout");
    dispatch({ type: LOGOUT_STUDENT });
  };

  const getAllAnnouncements = async () => {
    const { announcements_search, announcements_sort } = state;
    const url = `/announcement/allAnnouncements?search=${announcements_search}&sort=${announcements_sort}`;
    dispatch({ type: GET_ANNOUNCEMENTS_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { announcements } = data;
      dispatch({ type: GET_ANNOUNCEMENTS_SUCCESS, payload: { announcements } });
    } catch (err) {
      dispatch({
        type: GET_ANNOUNCEMENTS_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
  };

  const getStudentAttendance = async () => {
    dispatch({ type: STUDENT_ATTENDANCE_BEGIN });
    try {
      const { data } = await authFetch.get("/student/currentStudentAttendance");
      const { attendence } = data;
      console.log(attendence);
      dispatch({ type: STUDENT_ATTENDANCE_SUCCESS, payload: { attendence } });
    } catch (err) {
      dispatch({
        type: STUDENT_ATTENDANCE_ERROR,
      });
    }
  };

  const getStudentTimetable = async () => {
    dispatch({ type: STUDENT_TIMETABLE_BEGIN });
    try {
      const { data } = await authFetch.get("/student/timetable");
      const { timetable } = data;
      dispatch({ type: STUDENT_TIMETABLE_SUCCESS, payload: { timetable } });
    } catch (err) {
      dispatch({
        type: STUDENT_TIMETABLE_ERROR,
      });
    }
  };

  const getSingleCourse = async (courseId) => {
    console.log(courseId);
    dispatch({ type: GET_SINGLE_COURSE_BEGIN });
    try {
      const { data } = await authFetch.get(`/course/${courseId}`);
      const { course, instructors } = data;
      dispatch({
        type: GET_SINGLE_COURSE_SUCCESS,
        payload: { course, instructors },
      });
    } catch (err) {
      dispatch({
        type: GET_SINGLE_COURSE_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
  };

  const getCurrentStudent = async () => {
    dispatch({ type: CURRENT_STUDENT_BEGIN });
    try {
      const { data } = await authFetch.get("/student/currentStudent");
      const { student } = data;
      dispatch({
        type: CURRENT_STUDENT_SUCCESS,
        payload: { student },
      });
    } catch (err) {
      dispatch({
        type: CURRENT_STUDENT_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
  };

  const getStudentCourses = async () => {
    dispatch({ type: CURRENT_STUDENT_COURSES_BEGIN });
    try {
      const { data } = await authFetch.get("/student/currentStudentCourses");
      const { courses } = data;
      dispatch({
        type: CURRENT_STUDENT_COURSES_SUCCESS,
        payload: { courses },
      });
    } catch (err) {
      dispatch({
        type: CURRENT_STUDENT_COURSES_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const getDayOfWeek = () => {
    dispatch({
      type: GET_DAY_INFO,
      payload: {
        day: daysOfWeek[new Date().getDay()],
        date: moment().format("MMMM Do YYYY"),
      },
    });
  };

  const getCompleteCourseAttendence = async (courseId, is_lab) => {
    let url = `/attendence/completeCourseAttendence/${courseId}?`;

    dispatch({ type: COURSE_ATTENDENCE_BEGIN });
    try {
      if (is_lab) {
        url = url + `&lab=${is_lab}`;
      }
      const { data } = await authFetch.get(url);
      const { attendence } = data;
      dispatch({ type: COURSE_ATTENDENCE_SUCCESS, payload: attendence });
    } catch (err) {
      dispatch({ type: COURSE_ATTENDENCE_ERROR });
    }
  };

  const getCourseAssessment = async (courseId) => {
    dispatch({ type: COURSE_ASSESSMENT_BEGIN });
    try {
      const { data } = await authFetch.get(
        `/student/assessmentMarks/${courseId}`
      );
      const { assessment_results } = data;
      dispatch({
        type: COURSE_ASSESSMENT_SUCCESS,
        payload: assessment_results,
      });
    } catch (err) {
      dispatch({ type: COURSE_ASSESSMENT_ERROR });
    }
  };

  const getSingleAssessment = (type) => {
    const { courseAssessment } = state;
    dispatch({
      type: GET_SINGLE_ASSESSMENT,
      payload: { type, courseAssessment },
    });
  };
  const getStudentNotifications = async () => {
    dispatch({ type: STUDENT_NOTIFICATION_BEGIN });
    try {
      const { data } = await authFetch.get("/student/notifications");
      const { notifications } = data;
      console.log(data);
      dispatch({ type: STUDENT_NOTIFICATION_SUCCESS, payload: notifications });
    } catch (err) {
      dispatch({ type: STUDENT_NOTIFICATION_ERROR });
    }
  };

  useEffect(() => {
    getCurrentStudent();
  }, []);

  useEffect(() => {
    if (state.student) {
      dispatch({ type: DASHBOARD_LOADING_BEGIN });
      getStudentTimetable();
      getStudentAttendance();
      getStudentCourses();
      getDayOfWeek();
      getStudentNotifications();
      dispatch({ type: DASHBOARD_LOADING_END });
    }
  }, [state.student]);

  const handleAnnouncementChange = ({ name, value }) => {
    dispatch({ type: HANDLE_ANNOUNCEMENT, payload: { name, value } });
  };

  const HandleSidebarIndex = (index) => {
    dispatch({ type: HANDLE_SIDEBAR_INDEX, payload: { index } });
  };

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        getAllAnnouncements,
        handleAnnouncementChange,
        HandleSidebarIndex,
        loginStudent,
        displayAlert,
        logoutStudent,
        getSingleCourse,
        getCompleteCourseAttendence,
        getCourseAssessment,
        getSingleAssessment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
