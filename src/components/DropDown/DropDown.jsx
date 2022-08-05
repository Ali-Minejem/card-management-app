import React from "react";
import PropTypes from "prop-types";

function DropDown(props) {
  const {
    children,
    targetedParent,
    showDropdown,
    dropdownClasses,
    handleDropDownHidding,
  } = props;
  if (showDropdown)
    return (
      <div
        className={dropdownClasses}
        onClick={() => {
          handleDropDownHidding();
        }}
        id={targetedParent}
      >
        {children}
      </div>
    );
  return null;
}
DropDown.propType = {
  children: PropTypes.node,
  targetedParent: PropTypes.string,
  showDropdown: PropTypes.bool,
  dropdownClasses: PropTypes.string,
  handleDropDownHidding: PropTypes.func,
};
export default DropDown;
