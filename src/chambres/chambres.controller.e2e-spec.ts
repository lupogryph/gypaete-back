import {afterAll, beforeAll, describe, it, jest} from "@jest/globals";
import {INestApplication} from "@nestjs/common";
import request from "supertest";
import {ChambresController} from "./chambres.controller";
import {ChambresService} from "./chambres.service";
import {createEndpointApp} from "../../test/endpoint-test.helpers";

describe("Chambres endpoints (e2e)", () => {
  let app: INestApplication;
  const chambre = { numero: 2, nom: "Test chambre" };
  const photo = { total: 100, used: 25, left: 75 };
  const update = { affected: 1 };
  const remove = { affected: 1 };
  const resolves = <T>(value: T) =>
    jest.fn<() => Promise<T>>().mockResolvedValue(value);
  const chambresService = {
    create: resolves(chambre),
    findAll: resolves([chambre]),
    findOne: resolves(chambre),
    update: resolves(update),
    remove: resolves(remove),
    uploadPhoto: resolves(photo),
    addPhoto: resolves(photo),
    addLit: resolves({chambreNumero: 2, litId: 1, nombre: 1}),
  };

  beforeAll(async () => {
    app = await createEndpointApp(
      [ChambresController],
      [{ provide: ChambresService, useValue: chambresService }],
    );
  });

  afterAll(async () => app.close());

  it.each([
    {
      name: "POST /chambres",
      status: 201,
      body: chambre,
      send: () =>
        request(app.getHttpServer())
          .post("/chambres")
          .send({ nom: chambre.nom }),
    },
    {
      name: "GET /chambres",
      status: 200,
      body: [chambre],
      send: () => request(app.getHttpServer()).get("/chambres"),
    },
    {
      name: "GET /chambres/:id",
      status: 200,
      body: chambre,
      send: () => request(app.getHttpServer()).get("/chambres/2"),
    },
    {
      name: "PATCH /chambres/:id",
      status: 200,
      body: update,
      send: () =>
        request(app.getHttpServer())
          .patch("/chambres/2")
          .send({ nom: "Updated chambre" }),
    },
    {
      name: "DELETE /chambres/:id",
      status: 200,
      body: remove,
      send: () => request(app.getHttpServer()).delete("/chambres/2"),
    },
    {
      name: "PUT /chambres/:id/photo",
      status: 200,
      body: photo,
      send: () =>
        request(app.getHttpServer())
          .put("/chambres/2/photo")
          .attach("file", Buffer.from("photo"), "photo.jpg"),
    },
    {
      name: "POST /chambres/:id/photo",
      status: 201,
      body: photo,
      send: () =>
        request(app.getHttpServer())
          .post("/chambres/2/photo")
          .send({ url: "photo.jpg" }),
    },
    {
      name: "PUT /chambres/:numero/lit/:litId",
      status: 200,
      body: {chambreNumero: 2, litId: 1, nombre: 1},
      send: () =>
          request(app.getHttpServer()).put("/chambres/2/lit/1"),
    },
  ])(
    "$name returns its status and response body",
    async ({ send, status, body }) => {
      await send().expect(status).expect(body);
    },
  );
});
