import mongoose, { Document, Schema, model, Types } from "mongoose";

export interface ITask extends Document {
  description: string;
  user: Types.ObjectId;
  taskList: Types.ObjectId;
  assignedTo?: Types.ObjectId;
  assignedToLocal?: string;
  dueDate?: Date;
  active: boolean;
  complete: boolean;
}

const taskSchema = new Schema<ITask>(
  {
    description: {
      type: String,
      required: [true, "task description is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "task must belong to a user"],
    },
    taskList: {
      type: Schema.Types.ObjectId,
      ref: "TaskList",
      required: [true, "task must belong to task list"],
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    assignedToLocal: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    active: {
      type: Boolean,
      default: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//@ts-ignore
taskSchema.query.includeInActive = function () {
  //@ts-ignore
  this._includeInActive = true;
  return this;
};

taskSchema.pre(/^find/, function (next) {
  //@ts-ignore
  if (this._includeInActive) return next();
  // @ts-ignore
  this.where({ active: { $ne: false } });
  next();
});

export const Task = model<ITask>("Task", taskSchema);
