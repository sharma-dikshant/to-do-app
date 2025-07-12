import { Schema, model, Types, Document } from "mongoose";

export interface ITaskList extends Document {
  name: string;
  user: Types.ObjectId;
}

const taskListSchema = new Schema<ITaskList>(
  {
    name: {
      type: String,
      required: [true, "tasklist must have name"],
    },
    user: {
      type: Schema.ObjectId,
      ref: "TaskList",
      required: [true, "tasklist must belong to a user"],
    },
  },
  { timestamps: true }
);

export const TaskList = model<ITaskList>("TaskList", taskListSchema);
