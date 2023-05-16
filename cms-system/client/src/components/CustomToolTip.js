import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].payload.courseName}`}</p>
        <p
          className={
            payload[0].payload.attendence >= 80 ? "desc" : "desc danger"
          }
        >{`pct : ${payload[0].payload.attendance_percentage}`}</p>
      </div>
    );
  }

  return null;
};
export default CustomTooltip;
