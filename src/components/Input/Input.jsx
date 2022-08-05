import React from "react";
import PropTypes from "prop-types";

function Input(props) {
  const { value, name, id, label, handleChange, readOnly, type, classes } =
    props;
  return (
    <>
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label} <br />
        <input
          id={id}
          name={name}
          type={type}
          onChange={handleChange}
          value={value}
          className={classes}
          readOnly={readOnly}
        />
      </label>
      <br />
    </>
  );
}
Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  handleChange: PropTypes.func,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  classes: PropTypes.string,
};
export default Input;
