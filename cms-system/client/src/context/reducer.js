import {
  GET_ANNOUNCEMENTS_BEGIN,
  GET_ANNOUNCEMENTS_SUCCESS,
  GET_ANNOUNCEMENTS_ERROR,
  HANDLE_ANNOUNCEMENT,
  HANDLE_SIDEBAR_INDEX,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  LOGIN_STUDENT_BEGIN,
  LOGIN_STUDENT_SUCCESS,
  LOGIN_STUDENT_ERROR,
  CURRENT_STUDENT_BEGIN,
  CURRENT_STUDENT_SUCCESS,
  CURRENT_STUDENT_ERROR,
  LOGOUT_STUDENT,
  STUDENT_TIMETABLE_BEGIN,
  STUDENT_TIMETABLE_SUCCESS,
  STUDENT_TIMETABLE_ERROR,
  GET_SINGLE_COURSE_BEGIN,
  GET_SINGLE_COURSE_ERROR,
  GET_SINGLE_COURSE_SUCCESS,
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
} from "./actions.js";

const reducer = (state, action) => {
  if (action.type === GET_ANNOUNCEMENTS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_ANNOUNCEMENTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      announcements: action.payload.announcements,
    };
  }
  if (action.type === GET_ANNOUNCEMENTS_ERROR) {
    return { ...state, isLoading: false, showAlert: false };
  }
  if (action.type === HANDLE_ANNOUNCEMENT) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === HANDLE_SIDEBAR_INDEX) {
    return { ...state, sidebarIndex: action.payload.index };
  }
  if (action.type === DISPLAY_ALERT) {
    return { ...state, showAlert: true };
  }
  if (action.type === CLEAR_ALERT) {
    return { ...state, showAlert: false };
  }

  if (action.type === LOGIN_STUDENT_BEGIN) {
    return { ...state, showAlert: false, isLoading: true };
  }
  if (action.type === LOGIN_STUDENT_SUCCESS) {
    return {
      ...state,
      showAlert: true,
      isLoading: false,
      alertType: "success",
      alertText: "Login Successful! Redirecting...",
      student: action.payload.student,
    };
  }
  if (action.type === LOGIN_STUDENT_ERROR) {
    return {
      ...state,
      showAlert: true,
      isLoading: false,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === CURRENT_STUDENT_BEGIN) {
    return { ...state, showAlert: false, studentLoading: true };
  }
  if (action.type === CURRENT_STUDENT_SUCCESS) {
    return {
      ...state,
      studentLoading: false,
      student: action.payload.student,
    };
  }
  if (action.type === CURRENT_STUDENT_ERROR) {
    return {
      ...state,
      studentLoading: false,
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGOUT_STUDENT) {
    return { ...state, student: null };
  }

  if (action.type === DASHBOARD_LOADING_BEGIN) {
    return { ...state, studentLoading: true };
  }
  if (action.type === STUDENT_TIMETABLE_BEGIN) {
    return { ...state };
  }
  if (action.type === STUDENT_TIMETABLE_SUCCESS) {
    return {
      ...state,

      studentTimetable: action.payload.timetable,
    };
  }
  if (action.type === STUDENT_TIMETABLE_ERROR) {
    return {
      ...state,
      studentTimetable: [],
    };
  }

  if (action.type === GET_SINGLE_COURSE_BEGIN) {
    return { ...state, courseLoading: true };
  }
  if (action.type === GET_SINGLE_COURSE_SUCCESS) {
    return {
      ...state,
      courseLoading: false,
      singleCourse: action.payload.course,
      courseInstructors: action.payload.instructors,
    };
  }
  if (action.type === GET_SINGLE_COURSE_ERROR) {
    return {
      ...state,
      courseLoading: false,
      singleCourse: {},
      courseInstructors: [],
    };
  }

  if (action.type === STUDENT_ATTENDANCE_BEGIN) {
    return { ...state };
  }
  if (action.type === STUDENT_ATTENDANCE_SUCCESS) {
    return {
      ...state,
      studentAttendence: action.payload.attendence,
    };
  }
  if (action.type === STUDENT_ATTENDANCE_ERROR) {
    return {
      ...state,
      studentAttendence: [],
    };
  }

  if (action.type === CURRENT_STUDENT_COURSES_BEGIN) {
    return { ...state };
  }
  if (action.type === CURRENT_STUDENT_COURSES_SUCCESS) {
    return {
      ...state,
      studentCourses: action.payload.courses,
    };
  }
  if (action.type === CURRENT_STUDENT_COURSES_ERROR) {
    return {
      ...state,
      studentCourses: [],
    };
  }
  if (action.type === GET_DAY_INFO) {
    return {
      ...state,
      dayOfWeek: action.payload.day,
      date: action.payload.date,
    };
  }

  if (action.type === COURSE_ATTENDENCE_BEGIN) {
    return { ...state, attendenceLoading: true };
  }
  if (action.type === COURSE_ATTENDENCE_SUCCESS) {
    return {
      ...state,
      attendenceLoading: false,
      completeCourseAttendence: action.payload,
    };
  }
  if (action.type === COURSE_ATTENDENCE_ERROR) {
    return {
      ...state,
      attendenceLoading: false,
      completeCourseAttendence: [],
    };
  }

  if (action.type === COURSE_ASSESSMENT_BEGIN) {
    return { ...state, assessmentLoading: true };
  }
  if (action.type === COURSE_ASSESSMENT_SUCCESS) {
    return {
      ...state,
      assessmentLoading: false,
      courseAssessment: action.payload,
      singleTypeAssessment: action.payload.filter(
        (item) => item.assessment_type === "assignment"
      ),
      selectedType: "assignment",
    };
  }

  if (action.type === COURSE_ASSESSMENT_ERROR) {
    return {
      ...state,
      assessmentLoading: false,
    };
  }

  if (action.type === GET_SINGLE_ASSESSMENT) {
    return {
      ...state,
      singleTypeAssessment: action.payload.courseAssessment.filter(
        (item) => item.assessment_type === action.payload.type
      ),
      selectedType: action.payload.type,
    };
  }

  if (action.type === STUDENT_NOTIFICATION_BEGIN) {
    return { ...state };
  }
  if (action.type === STUDENT_NOTIFICATION_SUCCESS) {
    return {
      ...state,

      studentNotifications: action.payload,
    };
  }
  if (action.type === STUDENT_NOTIFICATION_ERROR) {
    return {
      ...state,

      studentNotifications: [],
    };
  }
  if (action.type === DASHBOARD_LOADING_END) {
    return { ...state, studentLoading: false };
  }
  throw new Error(`No such action : ${action.type}`);
};

export default reducer;
