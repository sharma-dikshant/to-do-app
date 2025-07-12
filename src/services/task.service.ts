import { Task, ITask } from "../models/task.model";
import { Types } from "mongoose";

interface CreateTaskInput {
  description: string;
  taskList: Types.ObjectId;
  assignedTo?: Types.ObjectId;
  dueDate?: Date;
  active?: boolean;
  complete?: boolean;
}

export const createTask = async (data: CreateTaskInput): Promise<ITask> => {
  const task = await Task.create(data);
  return task;
};
