import { Document } from "mongoose";

export default interface IUser extends Document {
  _id: number;
  userName: string;
  email: string;
  password: string;
  admin: boolean;
}
