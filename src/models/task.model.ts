import mongoose, { Document, Schema, model, Types } from "mongoose";

export interface ITask extends Document {
  description: string;
  taskList: Types.ObjectId;
  assignedTo?: Types.ObjectId;
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
    taskList: {
      type: Schema.Types.ObjectId,
      ref: "TaskList",
      required: [true, "task must belong to task list"],
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

taskSchema.pre(/^find/, function (next) {
  // @ts-ignore
  this.where({ active: { $ne: false } });
  next();
});

export const Task = model<ITask>("Task", taskSchema);
