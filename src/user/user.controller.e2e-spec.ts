import { afterAll, beforeAll, describe, it, jest } from "@jest/globals";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import {
  authenticatedUser,
  createEndpointApp,
} from "../../test/endpoint-test.helpers";
import { UserAdminController } from "./user.admin.controller";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

describe("User endpoints (e2e)", () => {
  let app: INestApplication;
  const user = { id: 7, email: authenticatedUser.email };
  const update = { affected: 1 };
  const remove = { affected: 1 };
  const resolves = <T>(value: T) =>
    jest.fn<() => Promise<T>>().mockResolvedValue(value);
  const userService = {
    create: resolves(user),
    findById: resolves(user),
    findAll: resolves([user]),
    update: resolves(update),
    remove: resolves(remove),
  };

  beforeAll(async () => {
    app = await createEndpointApp(
      [UserController, UserAdminController],
      [{ provide: UserService, useValue: userService }],
    );
  });

  afterAll(async () => app.close());

  it.each([
    {
      name: "POST /user",
      status: 201,
      body: user,
      send: () =>
        request(app.getHttpServer())
          .post("/user")
          .send({ email: user.email, role: "user" }),
    },
    {
      name: "GET /user",
      status: 200,
      body: user,
      send: () => request(app.getHttpServer()).get("/user"),
    },
    {
      name: "PATCH /user",
      status: 200,
      body: update,
      send: () =>
        request(app.getHttpServer())
          .patch("/user")
          .send({ email: "updated@example.com" }),
    },
    {
      name: "DELETE /user",
      status: 200,
      body: remove,
      send: () => request(app.getHttpServer()).delete("/user"),
    },
    {
      name: "POST /admin/user",
      status: 201,
      body: user,
      send: () =>
        request(app.getHttpServer())
          .post("/admin/user")
          .send({ email: user.email }),
    },
    {
      name: "GET /admin/user",
      status: 200,
      body: [user],
      send: () => request(app.getHttpServer()).get("/admin/user"),
    },
    {
      name: "GET /admin/user/:id",
      status: 200,
      body: user,
      send: () => request(app.getHttpServer()).get("/admin/user/7"),
    },
    {
      name: "PATCH /admin/user/:id",
      status: 200,
      body: update,
      send: () =>
        request(app.getHttpServer())
          .patch("/admin/user/7")
          .send({ email: "updated@example.com" }),
    },
    {
      name: "DELETE /admin/user/:email",
      status: 200,
      body: remove,
      send: () =>
        request(app.getHttpServer()).delete("/admin/user/user@example.com"),
    },
  ])(
    "$name returns its status and response body",
    async ({ send, status, body }) => {
      await send().expect(status).expect(body);
    },
  );
});
