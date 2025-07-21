import axios from "axios";
import { API_ROUTES } from "./api";
import toast from "react-hot-toast";
import { redirect } from "react-router-dom";

const API_SERVICES = {
  USER: {
    SEARCH_BY_EMAIL: async (q, setUsers) => {
      try {
        const response = await axios.get(API_ROUTES.USER.SEARCH_BY_EMAIL(q), {
          withCredentials: true,
        });
        setUsers(response.data.data || []);
      } catch (error) {
        toast.error("failed to find user!");
      }
    },
    SEARCH_BY_NAME: async (q, setUsers) => {
      try {
        const response = await axios.get(API_ROUTES.USER.SEARCH_BY_NAME(q), {
          withCredentials: true,
        });
        setUsers(response.data.data || []);
      } catch (error) {
        toast.error("failed to find user!");
      }
    },
  },
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
    RECYCLE_BIN_TASKLISTS: async (setTaskList) => {
      try {
        const response = await axios.get(API_ROUTES.TASK_LIST.RECYCLE_BIN, {
          withCredentials: true,
        });
        setTaskList(response.data.data || []);
      } catch (error) {
        toast.error("failed to fetch tasklists");
      }
    },
    SOFT_DELETE: async (taskListId, setTaskList) => {
      try {
        await axios.delete(API_ROUTES.TASK_LIST.SOFT_DELETE(taskListId), {
          withCredentials: true,
        });
        toast.success("successfully removed");
        if (setTaskList)
          setTaskList((p) => p.filter((t) => t._id !== taskListId));
      } catch (error) {
        console.log(error);
        toast.error("failed to remove taskList");
      }
    },
    RESTORE: async (taskListId, setRecycleTaskLists) => {
      try {
        const response = await axios.post(
          API_ROUTES.TASK_LIST.RESTORE(taskListId),
          {},
          { withCredentials: true }
        );
        toast.success("list restored");
        setRecycleTaskLists((p) => p.filter((t) => t._id !== taskListId));
      } catch (error) {
        toast.error("failed to restore tasklist");
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
    ALL_TASK_ASSIGNED_TO_ME: async (settasks) => {
      try {
        const response = await axios.get(API_ROUTES.TASK.ALL_TASK_ASSIGNED_ME, {
          withCredentials: true,
        });

        settasks(response.data.data || []);
      } catch (error) {
        toast.error("failed to fetch assigned tasks");
      }
    },
    ALL_TASK_DUE_ON_DATE: async (setTasks, date = "") => {
      try {
        const response = await axios.get(
          `${API_ROUTES.TASK.DUE_ON_DATE}?date=${date}`,
          { withCredentials: true }
        );

        setTasks(response.data.data || []);
      } catch (error) {
        toast.error("failed to fetch tasks");
      }
    },
    ALL_TASK_OF_MONTH_YEAR: async (month, year, setTasks) => {
      try {
        const response = await axios.get(
          API_ROUTES.TASK.GET_MONTHS_TASKS(year, month),
          { withCredentials: true }
        );
        setTasks(response.data.data || []);
      } catch (error) {
        toast.error("failed to fetch month plan");
      }
    },
  },
  AUTH: {
    LOGOUT: async () => {
      try {
        await axios.post(API_ROUTES.AUTH.LOGOUT, {}, { withCredentials: true });
        toast.success("logged out");
      } catch (error) {
        toast.error("failed to logout");
      }
      window.location.href = "/auth";
    },
  },
};

export default API_SERVICES;
