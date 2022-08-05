import React from "react";
import PropTypes from "prop-types";
import TaskCard from "../TaskCard/TaskCard";

function TasksColumn(props) {
  const { columnName, columnTasks, allowedStatus } = props;
  const filteredTaskList = columnTasks?.filter(
    (task) => task?.taskStatus === allowedStatus
  );
  const tasksList =
    filteredTaskList?.length > 0 ? (
      filteredTaskList?.map((task) => (
        <TaskCard key={task.id} taskInfos={task} />
      ))
    ) : (
      <p className="text-center">No task yet</p>
    );

  return (
    <div className="m-[15px] bg-[#f9f9f9] drop-shadow-md rounded p-[15px] basis-1/3 min-h-[300px] max-h-[600px] overflow-auto lg:max-w-[33%]">
      <div className="taskscolumn-header bold  text-center bg-[#dbddde] text-[#000] py-2 mb-[15px] rounded">
        {columnName}
      </div>
      <div className="flex flex-col">{tasksList}</div>
    </div>
  );
}
TasksColumn.propTypes = {
  columnName: PropTypes.string,
  columnTasks: PropTypes.array,
};

export default TasksColumn;
