import { Schema, model, Types, Document } from "mongoose";

export interface ITaskList extends Document {
  name: string;
  user: Types.ObjectId;
  active: boolean;
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
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//@ts-ignore
taskListSchema.query.includeInActive = function () {
  //@ts-ignore
  this._includeInActive = true;
  return this;
};

taskListSchema.pre(/^find/, function (next) {
  //@ts-ignore
  if (this._includeInActive) return next();

  //@ts-ignore
  this.where({ active: { $ne: false } });
  next();
});

export const TaskList = model<ITaskList>("TaskList", taskListSchema);
