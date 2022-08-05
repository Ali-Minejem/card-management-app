const TASKS = "tasks";
export const persistTasksInLocalStroage = (taskList) => {
  localStorage.setItem(TASKS, JSON.stringify(taskList));
  return;
};

export const getTasksFromLocalStorage = () => {
  return localStorage?.getItem(TASKS)
    ? JSON.parse(localStorage?.getItem(TASKS))
    : [];
};
