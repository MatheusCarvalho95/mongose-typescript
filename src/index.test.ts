import supertest from "supertest";
import app from "./index";
import mongoose from "mongoose";

describe("Post /users", () => {
  describe("given a userName, password and email", () => {
    test("should respond with a status of 200", async () => {
      const response = await supertest(app)
        .post("/users")
        .send({
          userName: "test",
          password: "test",
          email: "test" + Math.random(),
        });
      expect(response.status).toBe(200);
    });

    test("should specify json in the content type header", async () => {
      const response = await supertest(app)
        .post("/users")
        .send({
          userName: "test",
          password: "test",
          email: "test" + Math.random(),
        });
      expect(response.header["content-type"]).toEqual(
        expect.stringContaining("json"),
      );
    });

    test("should respond with a json object with the username and email", async () => {
      const response = await supertest(app)
        .post("/users")
        .send({
          userName: "test",
          password: "test",
          email: "test" + Math.random(),
        });
      expect(response.body.userName).toBeDefined();
      expect(response.body.email).toBeDefined();
    });
  });

  describe("when the userName, password and email is missing", () => {
    test("should respond with a status of 400 if no userName", async () => {
      const response = await supertest(app).post("/users").send({
        email: "test",
        password: "test",
      });
      expect(response.status).toBe(400);
    });
    test("should respond with a status of 400 if no password", async () => {
      const response = await supertest(app).post("/users").send({
        email: "test",
        userName: "test",
      });
      expect(response.status).toBe(400);
    });
    test("should respond with a status of 400 if no email", async () => {
      const response = await supertest(app).post("/users").send({
        userName: "test",
        password: "test",
      });
      expect(response.status).toBe(400);
    });
  });

  afterAll(() => mongoose.disconnect());
});
