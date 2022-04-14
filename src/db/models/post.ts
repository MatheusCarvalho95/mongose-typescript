import mongoose from "mongoose";
import { Schema } from "mongoose";
import IPost from "../interfaces/post";

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IPost>("Post", PostSchema);

export const OnlineStatusPostSchema = mongoose.connection.model(
  "Post",
  PostSchema,
  "post",
);
