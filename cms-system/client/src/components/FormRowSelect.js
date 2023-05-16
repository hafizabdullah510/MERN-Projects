import React from "react";

const FormRowSelect = ({ name, value, handleChange, list }) => {
  return (
    <div className="form-row">
      <select
        className="select"
        name={name}
        value={value}
        onChange={handleChange}
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
