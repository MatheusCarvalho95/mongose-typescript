import express from "express";

const router = express.Router();

// This is the home route /
router.get("/", (req, res) => {
  return res.send("Hello World");
});

export default router;
