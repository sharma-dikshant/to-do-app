import { Task, ITask } from "../models/task.model";
import { Types } from "mongoose";
import AppError from "../utils/appError";

interface CreateTaskInput {
  description: string;
  taskList: Types.ObjectId;
  assignedTo?: Types.ObjectId;
  dueDate?: Date;
  active?: boolean;
  complete?: boolean;
}

interface UpdateTask {
  description?: string;
  assignedTo?: Types.ObjectId;
  dueDate?: Date;
  complete?: boolean;
}

interface GetTaskFilter {
  _id?: string;
  assignedTo?: string;
  dueDate?: Date;
  complete?: boolean;
  taskList?: string;
  active?: boolean;
}

export const createTask = async (
  data: CreateTaskInput
): Promise<ITask | null> => {
  const task = await Task.create(data);
  return task;
};

export const updateTask = async (
  id: string,
  data: UpdateTask
): Promise<ITask> => {
  const task = await Task.findByIdAndUpdate(id, data, { new: true });
  if (!task) {
    throw new Error("No task found with given id");
  }
  return task;
};

export const getAllTask = async (filter: GetTaskFilter): Promise<ITask[]> => {
  const tasks = await Task.find(filter).populate("assignedTo", "name email");
  return tasks;
};

export const getAllTaskIncludeInactive = async (
  filter: GetTaskFilter
): Promise<ITask[]> => {
  //@ts-ignore
  const tasks = await Task.find(filter).includeInActive();
  return tasks;
};

export const deleteTask = async (id: string): Promise<null> => {
  const task = await Task.findByIdAndDelete(id);
  return null;
};

export const getDueTasksOnDate = async (date: string): Promise<ITask[]> => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const tasks = await Task.find({
    dueDate: {
      $gte: start,
      $lte: end,
    },
  });

  return tasks;
};

export const getMonthTasks = async (
  month: number,
  year: number
): Promise<ITask[]> => {
  const start = new Date(`${year}-${month + 1}-01`);
  let end = new Date(`${year}-${month + 2}-01`);
  if (month == 11) {
    end = new Date(`${year}-0${1}-${year + 1}`);
  }

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const tasks = await Task.find({
    createdAt: {
      $gte: start,
      $lt: end,
    },
  });

  return tasks;
};
