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

export const getTaskList = async (
  taskListId: string
): Promise<ITaskList | null> => {
  const taskList = await TaskList.findById(taskListId);
  return taskList;
};

export const getInActiveTaskList = async (
  taskListId: string
): Promise<ITaskList | null> => {
  //@ts-ignore
  const taskList = await TaskList.findById(taskListId).includeInActive();
  return taskList;
};

export const getAllDeletedListOfUser = async (
  userId: string
): Promise<ITaskList[]> => {
  //@ts-ignore
  const taskLists = await TaskList.find({ user: userId, active: false }).includeInActive();
  return taskLists;
};

export const getAllTaskListOfUser = async (
  userId: string
): Promise<ITaskList[]> => {
  const taskLists = await TaskList.find({ user: userId });
  return taskLists;
};

export const updateTaskList = async (
  taskListId: string,
  data: { name: string }
): Promise<ITaskList | null> => {
  const taskList = await TaskList.findByIdAndUpdate(taskListId, data, {
    new: true,
  });
  return taskList;
};

export const softDeleteTaskList = async (taskListId: string) => {
  await TaskList.findByIdAndUpdate(taskListId, { active: false });
  return null;
};

export const restoreTaskList = async (taskListId: string) => {
  // by-pass find query
  await TaskList.updateOne({ _id: taskListId }, { active: true });
  return null;
};
