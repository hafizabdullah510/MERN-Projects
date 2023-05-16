import { RiDashboardFill } from "react-icons/ri";
import { TfiAnnouncement } from "react-icons/tfi";
import { BsCalendar2RangeFill, BsClipboardMinusFill } from "react-icons/bs";
import { SiBookstack } from "react-icons/si";
import { CgTranscript } from "react-icons/cg";
import { GiTeacher, GiExpense, GiStairsGoal } from "react-icons/gi";
import { GrResources } from "react-icons/gr";
import { BiCalendarEvent } from "react-icons/bi";
import { CgLogOut } from "react-icons/cg";

export const links = [
  {
    id: 1,
    icon: <RiDashboardFill color="white" />,
    text: "Dashboard",
    path: "/",
  },
  {
    id: 2,
    icon: <TfiAnnouncement color="white" />,
    text: "Announcements",
    path: "announcements",
  },
  {
    id: 3,
    icon: <BsCalendar2RangeFill color="white" />,
    text: "Attendance",
    path: "attendence",
  },
  {
    id: 4,
    icon: <BsClipboardMinusFill color="white" />,
    text: "Marks",
    path: "marks",
  },
  {
    id: 5,
    icon: <SiBookstack color="white" />,
    text: "Courses",
  },

  {
    id: 6,
    icon: <GiExpense color="white" />,
    text: "Fees",
    path: "fees",
  },
];
