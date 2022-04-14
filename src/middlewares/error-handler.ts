import { NextFunction, Request, Response } from "express";
import ApiError from "../error/apiError";

function errorHandler(
  err: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }

  res.status(500).json("Something went wrong");
}

export default errorHandler;
