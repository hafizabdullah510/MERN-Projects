import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  Label,
} from "recharts";
import { colors } from "../utils/colors";
import CustomToolTip from "./CustomToolTip";

import { useGlobalContext } from "../context/AppContext";

const BarChartComponent = ({}) => {
  const { studentAttendence } = useGlobalContext();

  const modified_attendance = studentAttendence.map((item) => {
    const words = item.course_name.trim().split(" ");
    const initials = words.map((word) => word.charAt(0).toUpperCase());
    const courseName = initials.join("");

    return {
      courseName,
      attendence: `${item.attendance_percentage}`,
      attendance_percentage: `${item.attendance_percentage}%`,
      max_attendence: 100,
      is_lab_course: item.is_lab,
    };
  });

  const dashboard_attendance = modified_attendance.filter(
    (item) => !item.is_lab_course
  );

  if (studentAttendence.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          color: "#1d5c96",
        }}
      >
        No Attendence Record!
      </div>
    );
  }
  console.log(dashboard_attendance);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={dashboard_attendance} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3 " />
        <XAxis dataKey="courseName" />
        <YAxis dataKey="max_attendence" />
        <Tooltip content={<CustomToolTip />} />

        <Bar dataKey="attendence" barSize={15} radius={[10, 10, 0, 0]}>
          {dashboard_attendance.map((subject, index) => (
            <Cell
              key={`cell-${index}`}
              fill={subject.attendence >= 80 ? colors[0] : colors[1]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
