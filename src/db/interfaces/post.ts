import { Document } from "mongoose";
import IUser from "./user";

export default interface IPost extends Document {
  title: string;
  content: string;
  user: IUser;
}
