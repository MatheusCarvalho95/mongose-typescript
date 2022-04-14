import { Request } from "express";

import mongoose from "mongoose";

import Post from "../db/models/post";

export const postService = {
  getAllPosts: async () => {
    return await Post.find().populate("user", "userName").exec();
  },

  newPost: async (request: IPost) => {
    const post = new Post({
      title: request.body.title,
      content: request.body.content,
      user: request.user,
    });

    await post.save();
    const { user, ...newPost } = post.toObject();

    return newPost;
  },

  editPost: async (request: IPost) => {
    const post = await Post.findById(request.params.id);

    if (!post) {
      return new Error("404");
    }
    if (post.user._id.toString() != request.user._id.toString()) {
      return new Error("401");
    }

    post.title = request.body.title;
    post.content = request.body.content;

    await post.save();

    return post;
  },
};

interface IPost extends Request {
  body: {
    title: string;
    content: string;
  };
}
