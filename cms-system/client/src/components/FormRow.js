import React from "react";

const FormRow = ({
  name,
  id,
  placeholder,
  labelText,
  type,
  value,
  handleChange,
}) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={id}>
        {labelText}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        className="form-input"
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
