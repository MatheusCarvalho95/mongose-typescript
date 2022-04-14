import mongoose from "mongoose";
import { Schema } from "mongoose";

import IUser from "../interfaces/user";

const UserSchema: Schema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: false, default: false },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<IUser>("User", UserSchema);
