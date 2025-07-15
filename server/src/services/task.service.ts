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
  const tasks = await Task.find(filter);
  return tasks;
};

export const getAllTaskIncludeInactive = async (
  filter: GetTaskFilter
): Promise<ITask[]> => {
  //@ts-ignore
  const tasks = await Task.find(filter).includeInActive();
  return tasks;
};

export const softDeleteTask = async (id: string): Promise<null> => {
  const task = await Task.findByIdAndDelete(id);
  return null;
};
