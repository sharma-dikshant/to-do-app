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

export const createTask = async (
  data: CreateTaskInput
): Promise<ITask | null> => {
  const task = await Task.create(data);
  return task;
};

export const updateTask = async (
  id: String,
  data: UpdateTask
): Promise<ITask> => {
  const task = await Task.findByIdAndUpdate(id, data, { new: true });
  if (!task) {
    throw new Error("No task found with given id");
  }
  return task;
};

export const getAllTask = async () => {
  const tasks = await Task.find({});
  return tasks;
};

export const softDeleteTask = async (id: String) => {
  const task = await Task.findByIdAndDelete(id);
  return null;
};

export const getAllTaskOfTaskList = async (taskListId: String) => {
  const tasks = await Task.find({ taskList: taskListId });
  return tasks;
};
