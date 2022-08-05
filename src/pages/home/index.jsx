import React, { useState, useEffect } from "react";
import TasksColumn from "../../components/TasksColumn/TasksColumn";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import TextArea from "../../components/TextArea/TextArea";
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";
import {
  addTasks,
  editTask,
  getTasks,
  removeTask,
} from "../../features/tasks/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  getSelectedCardData,
  setSelectedCardData,
} from "../../features/selectedTask/selectedTaskSlice";
import { EDIT, SHOW_DETAILS, DELETE } from "../../features/tasks/taskConstants";
import { Link } from "react-router-dom";

function TasksContainer() {
  const [showModal, setShowModal] = useState();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskStatus, setTaskStatus] = useState("");

  const selectedAction = useSelector(getSelectedCardData);
  const dispatch = useDispatch();
  const taskList = useSelector(getTasks);
  const selectedTaskData = taskList?.find(
    (task) => task.id === selectedAction.id
  );

  const inputClasses =
    "shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const btnClasses =
    "bg-[#000] w-full text-white font-bold py-2 px-4 rounded text-center cursor-pointer";
  const disabledClasses =
    "bg-[#000] w-full text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed";

  const deleteBtnClasses =
    "w-full mt-2 py-2 px-3 bg-transparent border border-red-500 text-red-700 font-normal  rounded";
  const keepitBtnClasses =
    "w-full mt-2 py-2 px-3 bg-[#000] !text-gray-100 border border-[#000] text-blue-700 font-normal  rounded";

  const handleAddNewTask = () => {
    resetTaskData();
    setShowModal(true);
  };
  const onClose = () => {
    setShowModal(false);
    resetTaskData();
  };
  const resetTaskData = () => {
    setTaskTitle("");
    setTaskDescription("");
    setTaskPriority("");
  };
  const handleChangeTitle = (e) => {
    setTaskTitle(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setTaskDescription(e.target.value);
  };
  const handleChangePriority = (e) => {
    setTaskPriority(e.target.value);
  };

  const handleChangeStatus = (e) => {
    setTaskStatus(e.target.value);
  };
  const handleCreateNewTask = () => {
    dispatch(
      addTasks({
        id: uuidv4(),
        taskTitle,
        taskDescription,
        taskPriority,
        taskStatus: "TODO",
      })
    );

    resetTaskData();
    onClose();
  };
  const closeActionsModal = () => {
    dispatch(setSelectedCardData({ id: "", actionToPerform: "" }));
  };
  const deleteSelectedTask = () => {
    dispatch(removeTask({ id: selectedAction.id }));
    closeActionsModal();
  };

  const editSelectedTask = () => {
    dispatch(
      editTask({
        id: selectedAction.id,
        taskTitle,
        taskDescription,
        taskPriority,
        taskStatus,
      })
    );
    closeActionsModal();
  };

  useEffect(() => {
    if (
      selectedAction?.actionToPerform === EDIT ||
      selectedAction?.actionToPerform === SHOW_DETAILS
    ) {
      setTaskTitle(selectedTaskData?.taskTitle);
      setTaskDescription(selectedTaskData?.taskDescription);
      setTaskPriority(selectedTaskData?.taskPriority);
      setTaskStatus(selectedTaskData?.taskStatus);
    }
  }, [selectedAction, selectedTaskData]);

  return (
    <>
      <Modal visible={showModal} title="Add new task" onClose={onClose}>
        <Input
          type="text"
          label="Title"
          id="taskTitle"
          name="taskTitle"
          classes={inputClasses}
          value={taskTitle}
          handleChange={handleChangeTitle}
        />

        <TextArea
          type="text"
          label="Description"
          id="taskDescription"
          name="taskDescription"
          classes={inputClasses}
          value={taskDescription}
          handleChange={handleChangeDescription}
        />
        <Select
          label="Priority"
          id="taskPriority"
          name="taskPriority"
          classes={inputClasses}
          value={taskPriority}
          handleChange={handleChangePriority}
          options={[
            { label: "-- select priority --", value: "" },
            { label: "Minor", value: "minor" },
            { label: "Medior", value: "medior" },
            { label: "Major", value: "Major" },
          ]}
        />
        <div className="">
          <Button
            disabledClasses={disabledClasses}
            disabled={!taskTitle || !taskDescription || !taskPriority}
            label="Add Task"
            classes={btnClasses}
            handleClick={handleCreateNewTask}
          />
        </div>
      </Modal>
      {selectedAction?.actionToPerform === DELETE && (
        <Modal
          visible={selectedAction?.actionToPerform === DELETE}
          title="Delete task"
          onClose={closeActionsModal}
        >
          <p className="mb-[30px]">
            Are your sure you want to delete this task ?
          </p>
          <div className="flex gap-[10px]">
            <Button
              disabledClasses=""
              disabled={false}
              label="keep it"
              classes={keepitBtnClasses}
              handleClick={closeActionsModal}
            />
            <Button
              disabledClasses=""
              disabled={false}
              label="Delete it"
              classes={deleteBtnClasses}
              handleClick={deleteSelectedTask}
            />
          </div>
        </Modal>
      )}
      {selectedAction?.actionToPerform === EDIT && (
        <Modal
          visible={selectedAction?.actionToPerform === EDIT}
          title="Edit task"
          onClose={closeActionsModal}
        >
          <Input
            type="text"
            label="Title"
            id="taskTitle"
            name="taskTitle"
            classes={inputClasses}
            value={taskTitle}
            handleChange={handleChangeTitle}
          />

          <TextArea
            type="text"
            label="Description"
            id="taskDescription"
            name="taskDescription"
            classes={inputClasses}
            value={taskDescription}
            handleChange={handleChangeDescription}
          />
          <Select
            label="Priority"
            id="taskPriority"
            name="taskPriority"
            classes={inputClasses}
            value={taskPriority}
            handleChange={handleChangePriority}
            options={[
              { label: "-- select priority --", value: "" },
              { label: "Minor", value: "minor" },
              { label: "Medior", value: "medior" },
              { label: "Major", value: "Major" },
            ]}
          />

          <Select
            label="Status"
            id="taskStatus"
            name="taskStatus"
            classes={inputClasses}
            value={taskStatus}
            handleChange={handleChangeStatus}
            options={[
              { label: "-- select status --", value: "" },
              { label: "TODO", value: "TODO" },
              { label: "In progress", value: "IN_PROGRESS" },
              { label: "Done", value: "DONE" },
            ]}
          />
          <div className="">
            <Button
              disabledClasses={disabledClasses}
              disabled={
                !taskTitle || !taskDescription || !taskPriority || !taskStatus
              }
              label="Edit Task"
              classes={btnClasses}
              handleClick={editSelectedTask}
            />
          </div>
        </Modal>
      )}
      {selectedAction?.actionToPerform === SHOW_DETAILS && (
        <Modal
          visible={selectedAction?.actionToPerform === SHOW_DETAILS}
          title="Details task"
          onClose={closeActionsModal}
        >
          <Input
            type="text"
            label="Title"
            id="taskTitle"
            name="taskTitle"
            classes={inputClasses}
            value={taskTitle}
            readOnly
          />

          <TextArea
            type="text"
            label="Description"
            id="taskDescription"
            name="taskDescription"
            classes={inputClasses}
            value={taskDescription}
            readOnly
          />
          <Select
            label="Priority"
            id="taskPriority"
            name="taskPriority"
            classes={inputClasses}
            value={taskPriority}
            disabled
            options={[
              { label: "-- select priority --", value: "" },
              { label: "Minor", value: "minor" },
              { label: "Medior", value: "medior" },
              { label: "Major", value: "Major" },
            ]}
          />

          <Select
            label="Status"
            id="taskStatus"
            name="taskStatus"
            classes={inputClasses}
            value={taskStatus}
            handleChange={handleChangeStatus}
            disabled
            options={[
              { label: "-- select status --", value: "" },
              { label: "TODO", value: "TODO" },
              { label: "In progress", value: "IN_PROGRESS" },
              { label: "Done", value: "DONE" },
            ]}
          />
          <div className="">
            <Button
              disabledClasses={disabledClasses}
              label="Close"
              classes={btnClasses}
              handleClick={editSelectedTask}
            />
          </div>
        </Modal>
      )}

      <div className="flex  gap-[20px] mt-[20px] mr-[15px] cursor-pointer mb-[10px] justify-end">
        {taskList.length > 0 && (
          <Link to="/stats">
            <Button
              label="Show stats"
              classes="bg-black hover:opacity-70 text-white font-bold py-2 px-4 rounded-full"
            />
          </Link>
        )}
        <Button
          handleClick={handleAddNewTask}
          label="Add new task"
          classes="bg-black hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded-full"
        />
      </div>
      <div className="flex flex-auto flex-col md:flex-col lg:flex-row">
        <TasksColumn
          columnName="TODO"
          columnTasks={taskList}
          allowedStatus="TODO"
        />
        <TasksColumn
          columnName="In Progress"
          columnTasks={taskList}
          allowedStatus="IN_PROGRESS"
        />
        <TasksColumn
          columnName="Done"
          columnTasks={taskList}
          allowedStatus="DONE"
        />
      </div>
    </>
  );
}

export default TasksContainer;
