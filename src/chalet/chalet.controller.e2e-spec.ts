import { afterAll, beforeAll, describe, it, jest } from "@jest/globals";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { ChaletController } from "./chalet.controller";
import { ChaletService } from "./chalet.service";
import { createEndpointApp } from "../../test/endpoint-test.helpers";

describe("Chalet endpoints (e2e)", () => {
  let app: INestApplication;
  const chalet = { id: 1, name: "Test chalet" };
  const photo = { total: 100, used: 25, left: 75 };
  const update = { affected: 1 };
  const remove = { affected: 1 };
  const resolves = <T>(value: T) =>
    jest.fn<() => Promise<T>>().mockResolvedValue(value);
  const chaletService = {
    create: resolves(chalet),
    findOne: resolves(chalet),
    update: resolves(update),
    remove: resolves(remove),
    uploadPhoto: resolves(photo),
    addPhoto: resolves(photo),
  };

  beforeAll(async () => {
    app = await createEndpointApp(
      [ChaletController],
      [{ provide: ChaletService, useValue: chaletService }],
    );
  });

  afterAll(async () => app.close());

  it.each([
    {
      name: "POST /chalet",
      status: 201,
      body: chalet,
      send: () =>
        request(app.getHttpServer())
          .post("/chalet")
          .send({ name: chalet.name }),
    },
    {
      name: "GET /chalet",
      status: 200,
      body: chalet,
      send: () => request(app.getHttpServer()).get("/chalet"),
    },
    {
      name: "PATCH /chalet",
      status: 200,
      body: update,
      send: () =>
        request(app.getHttpServer())
          .patch("/chalet")
          .send({ name: "Updated chalet" }),
    },
    {
      name: "DELETE /chalet",
      status: 200,
      body: remove,
      send: () => request(app.getHttpServer()).delete("/chalet"),
    },
    {
      name: "PUT /chalet/photo",
      status: 200,
      body: photo,
      send: () =>
        request(app.getHttpServer())
          .put("/chalet/photo")
          .attach("file", Buffer.from("photo"), "photo.jpg"),
    },
    {
      name: "POST /chalet/photo",
      status: 201,
      body: photo,
      send: () =>
        request(app.getHttpServer())
          .post("/chalet/photo")
          .send({ url: "photo.jpg" }),
    },
  ])(
    "$name returns its status and response body",
    async ({ send, status, body }) => {
      await send().expect(status).expect(body);
    },
  );
});
