import express from "express";
import ApiError from "../error/apiError";
import { userService } from "../services/user";
import passport from "passport";

const router = express.Router();

//TODO Refactor to a controller pattern

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const result = await userService.getAllUsers();

    return res.send(result);
  },
);

router.get(
  "/one",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    if (!Object.keys(req.query).length) {
      return next(ApiError.badRequest("You need to provide a query"));
    }

    const result = await userService.getOneUser(req.query);

    if (!result) {
      return next(ApiError.notFound("No match found"));
    }
    return res.send(result);
  },
);
router.post("/", async (req, res, next) => {
  const result = await userService.newUser(req.body);
  if (result instanceof Error) {
    switch (result.message) {
      case "400-exists":
        next(ApiError.badRequest("There is already a user with this email"));
        break;
      case "400-missing":
        next(
          ApiError.badRequest(
            "To register you need to provide email, userName and password",
          ),
        );
        break;
      default:
        next(ApiError.badRequest("Something went wrong"));
        break;
    }
    return;
  }
  return res.send(result);
});

router.post("/login", async (req, res, next) => {
  const result = await userService.login(req.body);
  if (result instanceof Error) {
    switch (result.message) {
      case "404":
        next(ApiError.notFound("User not found"));
        break;
      case "401":
        next(ApiError.unauthorized("Invalid password"));
        break;
      default:
        next(ApiError.badRequest("Something went wrong"));
        break;
    }
    return;
  }
  res
    .status(200)
    .send({ token: "Bearer " + result, message: "Login successful" });
});

export default router;
