import User from "../db/models/user";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const userService = {
  getAllUsers: async () => {
    return await User.find({}, { password: 0 }).exec();
  },

  getOneUser: async (params: any) => {
    return await User.findOne(params, { password: 0 }).exec();
  },

  newUser: async ({ userName, email, password }: INewUser) => {
    const exists = await User.findOne({ email }).exec();
    if (exists) {
      return new Error("400-exists");
    }
    if (!userName || !email || !password) {
      return new Error("400-missing");
    }
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();

    return ({ userName, email } = user);
  },

  login: async ({ email, password }: ILogin) => {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return new Error("404");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return new Error("401");
    }
    const privateKey = process.env.PRIVATE_KEY ?? "no-key";

    const token = jwt.sign(
      { userName: user.userName, email: user.email, admin: user.admin },
      privateKey,
      { expiresIn: "1d" },
    );

    return token;
  },
};

interface INewUser {
  userName: string;
  email: string;
  password: string;
}
interface ILogin {
  email: string;
  password: string;
}
