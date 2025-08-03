import { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  localUsers?: string[];
  defaultView?: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    minlength: [8, "password length should be atleast 8"],
    required: [true, "password is required"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "password confirm is required"],
    validate: {
      validator: function (this) {
        return this.password === this.passwordConfirm;
      },
      message: "password and password confirm is not same",
    },
  },
  localUsers: [
    {
      type: String,
      lowercase: true,
    },
  ],
  defaultView: String,
});

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.verifyPassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>("User", userSchema);
