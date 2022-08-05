import React from "react";
import PropTypes from "prop-types";

function Button(props) {
  const { label, handleClick, classes, disabled, disabledClasses } = props;
  return (
    <button
      type="button"
      onClick={handleClick}
      className={disabled ? disabledClasses : classes}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func,
  classes: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
