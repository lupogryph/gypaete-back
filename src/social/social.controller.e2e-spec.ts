import { afterAll, beforeAll, describe, it, jest } from "@jest/globals";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { SocialController } from "./social.controller";
import { SocialService } from "./social.service";
import { createEndpointApp } from "../../test/endpoint-test.helpers";

describe("Social endpoints (e2e)", () => {
  let app: INestApplication;
  const social = { id: 3, name: "Test social" };
  const update = { affected: 1 };
  const remove = { affected: 1 };
  const resolves = <T>(value: T) =>
    jest.fn<() => Promise<T>>().mockResolvedValue(value);
  const socialService = {
    create: resolves(social),
    findAll: resolves([social]),
    findOne: resolves(social),
    update: resolves(update),
    remove: resolves(remove),
  };

  beforeAll(async () => {
    app = await createEndpointApp(
      [SocialController],
      [{ provide: SocialService, useValue: socialService }],
    );
  });

  afterAll(async () => app.close());

  it.each([
    {
      name: "POST /social",
      status: 201,
      body: social,
      send: () =>
        request(app.getHttpServer())
          .post("/social")
          .send({ name: social.name }),
    },
    {
      name: "GET /social",
      status: 200,
      body: [social],
      send: () => request(app.getHttpServer()).get("/social"),
    },
    {
      name: "GET /social/:id",
      status: 200,
      body: social,
      send: () => request(app.getHttpServer()).get("/social/3"),
    },
    {
      name: "PATCH /social/:id",
      status: 200,
      body: update,
      send: () =>
        request(app.getHttpServer())
          .patch("/social/3")
          .send({ name: "Updated social" }),
    },
    {
      name: "DELETE /social/:id",
      status: 200,
      body: remove,
      send: () => request(app.getHttpServer()).delete("/social/3"),
    },
  ])(
    "$name returns its status and response body",
    async ({ send, status, body }) => {
      await send().expect(status).expect(body);
    },
  );
});
