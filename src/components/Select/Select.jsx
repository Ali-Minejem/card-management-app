import React from "react";
import PropTypes from "prop-types";

function Select(props) {
  const {
    value,
    name,
    id,
    label,
    handleChange,
    disabled = false,
    options,
    classes,
  } = props;
  return (
    <>
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label} <br />
        <select
          name={name}
          id={id}
          onChange={handleChange}
          value={value}
          classes={classes}
          disabled={disabled}
          style={{
            width: "100%",
            border: "2px solid #e4e4e8",
            borderRadius: 5,
            padding: 5,
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <br />
    </>
  );
}

Select.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  handleChange: PropTypes.func,
  disabled: PropTypes.bool,
  options: PropTypes.array,
  classes: PropTypes.string,
};

export default Select;
