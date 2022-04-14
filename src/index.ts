//Importing dotenv config as a better name for the method
import { config as configEnv } from "dotenv";
configEnv();

import express from "express";
import passport from "passport";

import connectToMongoose from "./db/mongo";

//Routes
import index from "./routes/home";
import user from "./routes/user";
import post from "./routes/post";
import errorHandler from "./middlewares/error-handler";

import "./middlewares/passport";

//Creates de app with express
const app = express();

//Enable requisition body with json
app.use(express.json());

//Connect to mongoose database
connectToMongoose(process.env.MONGO_URL);

//Enable passport
app.use(passport.initialize());

//Using the routes
app.use(index);
app.use("/users", user);
app.use("/posts", post);

//Using the error middleware
app.use(errorHandler);

export default app;
