import axios from "axios";
import { API_ROUTES } from "./api";
import toast from "react-hot-toast";

const API_SERVICES = {
  TASK_LIST: {
    CREATE: async (setTaskList, newTaskList) => {
      try {
        const response = await axios.post(
          API_ROUTES.TASK_LIST.CREATE,
          newTaskList,
          { withCredentials: true }
        );

        setTaskList((prev) => [...prev, response.data.data]);
      } catch (error) {
        toast.error("failed to created taskList");
      }
    },
    ALL_LIST_OF_USER: async (userId, setTaskLists) => {
      try {
        const response = await axios.get(
          API_ROUTES.TASK_LIST.ALL_LIST_OF_USER(userId),
          { withCredentials: true }
        );
        setTaskLists(response.data.data || []);
      } catch (error) {
        toast.error("failed to fetch task lists");
      }
    },
  },
  TASK: {
    CREATE: async (newtask, setTasks) => {
      try {
        const response = await axios.post(API_ROUTES.TASK.CREATE, newtask, {
          withCredentials: true,
        });
        setTasks((p) => [...p, response.data.data]);
      } catch (error) {
        toast.error("failed to create task");
      }
    },
    UPDATE: async (taskId, updateData, setTasks) => {
      try {
        const response = await axios.patch(
          API_ROUTES.TASK.UPDATE(taskId),
          updateData,
          { withCredentials: true }
        );

        setTasks((prevTasks) =>
          prevTasks.map((t) => (t._id === taskId ? response.data.data : t))
        );
      } catch (error) {
        toast.error("failed to update task");
      }
    },
    DELETE: async (taskId, setTasks) => {
      try {
        await axios.delete(API_ROUTES.TASK.DELETE(taskId), {
          withCredentials: true,
        });
        setTasks((p) => {
          return p.filter((t) => t._id !== taskId);
        });
      } catch (error) {
        toast.error("failed to remove task");
      }
    },
    ALL_TASK_OF_LIST: async (taskListId, setTasks) => {
      try {
        const response = await axios.get(
          API_ROUTES.TASK.ALL_TASK_OF_LIST(taskListId),
          {
            withCredentials: true,
          }
        );
        setTasks(response.data.data);
      } catch (error) {
        toast.error("failed to fetch tasks");
      }
    },
  },
};

export default API_SERVICES;
