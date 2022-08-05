import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import { FcHighPriority } from "react-icons/fc";
import DropDown from "../DropDown/DropDown";
import { setSelectedCardData } from "../../features/selectedTask/selectedTaskSlice";

function TaskCard(props) {
  const { taskInfos } = props;
  const { id, taskTitle, taskDescription, taskPriority } = taskInfos;
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const dropdownClasses =
    "absolute shadow-md p-[8px] bg-[#fff] rounded-sm text-[14px] top-[20px] mb-[20px] right-[10px] !z-10";
  const dropdownOptions = [
    { label: "Show details", action: "SHOW-DETAILS" },
    { label: "Edit", action: "EDIT" },
    { label: "Delete", action: "DELETE" },
  ];

  const handleDropDownVisibility = () => {
    setShowDropdown((prevVisibility) => !prevVisibility);
  };
  const handleDropDownHidding = () => {
    setShowDropdown(false);
  };

  const handleActionSelection = (e) => {
    dispatch(setSelectedCardData({ id, action: e.target.dataset.action }));
  };

  const dropdownBody = dropdownOptions.map(({ label, action }) => (
    <div
      key={label + action}
      className="border-b-[1px] py-[4px] hover:opacity-60"
      data-action={action}
      onClick={handleActionSelection}
    >
      {label}
    </div>
  ));

  return (
    <div
      id={id}
      className="card-container bg-[#fff] drop-shadow-md rounded p-[10px] mb-[22px] cursor-pointer relative z-1"
    >
      <div className="flex justify-between">
        <div className="card-head uppercase underline font-bold">
          {taskTitle}
        </div>
        <div onClick={handleDropDownVisibility}>
          <BsThreeDots />
        </div>
      </div>
      <DropDown
        targetedParent={id}
        showDropdown={showDropdown}
        dropdownClasses={dropdownClasses}
        handleDropDownHidding={handleDropDownHidding}
      >
        <>{dropdownBody}</>
      </DropDown>
      <div className="card-taskDescription font-light my-3">
        {taskDescription}
      </div>
      <div className="card-footer flex gap-[10px]">
        <div className="font-extralight text-[12px] flex">
          <FcHighPriority size={17} className=" mr-[8px]" />
          <span className="underline mr-[5px] font-semibold">
            Priority:{" "}
          </span>{" "}
          {taskPriority}
        </div>
      </div>
    </div>
  );
}

TaskCard.propTypes = {
  taskInfos: PropTypes.shape({
    id: PropTypes.string,
    taskTitle: PropTypes.string,
    taskDescription: PropTypes.string,
    taskStatus: PropTypes.string,
    taskPriority: PropTypes.string,
  }),
};

export default TaskCard;
