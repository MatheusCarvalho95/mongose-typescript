import express from "express";
import passport from "passport";
import ApiError from "../error/apiError";
import { postService } from "../services/post";

const router = express.Router();
//TODO Refactor to a controller pattern
router.get("/", async (req, res) => {
  const result = await postService.getAllPosts();

  return res.send(result);
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const result = await postService.newPost(req);

    return res.send(result);
  },
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const result = await postService.editPost(req);
    if (result instanceof Error) {
      switch (result.message) {
        case "404":
          next(ApiError.notFound("No post found"));
          break;
        case "401":
          next(ApiError.unauthorized("You are not allowed to edit this post"));
          break;
      }
      return;
    }
    return res.send(result);
  },
);

export default router;
