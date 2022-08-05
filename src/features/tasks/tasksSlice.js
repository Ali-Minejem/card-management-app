import { createSlice } from "@reduxjs/toolkit";
import {
  persistTasksInLocalStroage,
  getTasksFromLocalStorage,
} from "./tasksHelper";

import toast from "react-hot-toast";

const initialState = {
  tasks: getTasksFromLocalStorage(),
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTasks: (state, action) => {
      state?.tasks?.push(action?.payload);
      persistTasksInLocalStroage(state.tasks);
      toast.success("Task added successfully");
    },
    removeTask: (state, action) => {
      const id = action.payload.id;
      state.tasks = state.tasks.filter((task) => task.id !== id);
      persistTasksInLocalStroage(state.tasks);
      toast.success("Task deleted successfully");
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          const { taskPriority, taskDescription, taskTitle, taskStatus } =
            action.payload;
          if (
            task.taskPriority !== taskPriority ||
            task.taskDescription !== taskDescription ||
            task.taskStatus !== taskStatus ||
            task.taskTitle !== taskTitle
          ) {
            task = action.payload;
            toast.success("Task edited successfully");
          }
        }
        return task;
      });

      persistTasksInLocalStroage(state.tasks);
    },
  },
});

export const { addTasks, removeTask, editTask } = tasksSlice.actions;
export const getTasks = (state) => state.taskReducer.tasks;
export default tasksSlice.reducer;
