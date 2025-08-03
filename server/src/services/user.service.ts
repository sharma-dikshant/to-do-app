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

export const updateUser = async (userId: string, updateData: object) => {
  const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

  return user;
};

export const createLocalUser = async (userId: string, localUser: string) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: { localUsers: localUser },
    },
    { new: true }
  );
  return user;
};

export const getUser = async (email: string): Promise<IUser | null> => {
  const user = await User.findOne({ email: email }).select("+password");
  return user;
};

export const searchUserWithEmail = async (data: string): Promise<IUser[]> => {
  const users = await User.find({
    email: { $regex: "^" + data, $options: "i" },
  });
  return users;
};

export const searchUserWithName = async (data: string): Promise<IUser[]> => {
  const users = await User.find({
    name: { $regex: "^" + data, $options: "i" },
  }).select("name email");

  return users;
};

export const searchLocalUserWithName = async (
  userId: string,
  data: string
): Promise<string[]> => {
  const userDoc = await User.findById(userId);

  const regex = "^" + data.toLowerCase();

  const localUsers = userDoc?.localUsers?.filter((u) => u.match(regex)) || [];
  return localUsers;
};
