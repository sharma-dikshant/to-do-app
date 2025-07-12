import { User, IUser } from "../models/user.model";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export const createUser = async (data: CreateUserInput): Promise<IUser> => {
  const user = await User.create(data);
  return user;
};
