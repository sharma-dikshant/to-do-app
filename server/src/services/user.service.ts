import { User, IUser } from "../models/user.model";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const createUser = async (data: CreateUserInput): Promise<IUser> => {
  const user = await User.create(data);
  return user;
};

export const getUser = async (email: string): Promise<IUser | null> => {
  const user = await User.findOne({ email: email }).select(
    "password name email"
  );
  return user;
};

export const searchUserWithEmail = async (data: string): Promise<IUser[]> => {
  const users = await User.find({
    email: { $regex: "^" + data, $options: "i" },
  });
  return users;
};
