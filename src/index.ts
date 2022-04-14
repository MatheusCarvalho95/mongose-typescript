//Importing dotenv config as a better name for the method
import { config as configEnv } from "dotenv";
configEnv();

import stream from "stream";

import express from "express";
import passport from "passport";

import connectToMongoose, { mongooseConnection } from "./db/mongo";

//Routes
import index from "./routes/home";
import user from "./routes/user";
import post from "./routes/post";
import errorHandler from "./middlewares/error-handler";

import "./middlewares/passport";
import { OnlineStatusPostSchema } from "./db/models/post";
import mongoose from "mongoose";

//Creates de app with express
const app = express();

//Enable requisition body with json
app.use(express.json());

//Enable passport
app.use(passport.initialize());

//Using the routes
app.use(index);
app.use("/users", user);
app.use("/posts", post);

//Using the error middleware
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

async function watchForPostChanges() {
  //Connect to mongoose database
  await connectToMongoose(process.env.MONGO_URL);
  console.log("Watching for changes...");
  // const pipeline = [
  //   {
  //     $match: {
  //       $or: [{ operationType: "insert" }, { operationType: "update" }],
  //     },
  //   },
  //   { $project: { "fullDocument._id": 1, "fullDocument.receiveTs": 1 } },
  // ];
  const postModel = mongoose.model("Post");

  const collection = mongooseConnection.collections["post"];

  const changeStream = postModel.watch([]);

  // console.log(changeStream);
  changeStream.on("change", async (change: any) => {
    console.log("call on");
    // get meters reading log for respective platfrom and date
    try {
      console.log(change);
    } catch (error) {
      console.log(error);
    }
  });

  // changeStream.stream().pipe(
  //   new stream.Writable({
  //     objectMode: true,
  //     write: function (doc, _, cb) {
  //       console.log(doc);
  //       cb();
  //     },
  //   }),
  // );
}

watchForPostChanges();
