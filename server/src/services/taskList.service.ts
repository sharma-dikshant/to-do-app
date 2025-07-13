import { Types } from "mongoose";
import { ITaskList, TaskList } from "../models/taskList.model";
interface CreateTaskListInterface {
  name: string;
  user: Types.ObjectId;
}

export const creatTaskList = async (
  data: CreateTaskListInterface
): Promise<ITaskList> => {
  const taskList = await TaskList.create(data);
  return taskList;
};

export const getAllTaskListOfUser = async (
  userId: String
): Promise<ITaskList[]> => {
  console.log(userId);
  const taskLists = await TaskList.find({ user: userId });
  return taskLists;
};
