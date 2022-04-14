import IUser from "../db/interfaces/user";

declare module "express-serve-static-core" {
  export interface Request {
    user: IUser;
  }
}
