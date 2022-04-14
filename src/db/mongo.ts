import mongoose from "mongoose";
import MONGO_OPTIONS from "../../mongo_options.json";

export default async function (uri: string = "mongodb://localhost:27017/test") {
  try {
    await mongoose.connect(uri, MONGO_OPTIONS);
  } catch (err) {
    console.log(err);
  }
}

export const mongooseConnection = mongoose.connection;
