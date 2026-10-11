import { afterAll, beforeAll, describe, it, jest } from "@jest/globals";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";
import { createEndpointApp } from "../../test/endpoint-test.helpers";

describe("Contact endpoints (e2e)", () => {
  let app: INestApplication;
  const contact = { id: 1, email: "contact@example.com" };
  const update = { affected: 1 };
  const remove = { affected: 1 };
  const resolves = <T>(value: T) =>
    jest.fn<() => Promise<T>>().mockResolvedValue(value);
  const contactService = {
    create: resolves(contact),
    findOne: resolves(contact),
    update: resolves(update),
    remove: resolves(remove),
  };

  beforeAll(async () => {
    app = await createEndpointApp(
      [ContactController],
      [{ provide: ContactService, useValue: contactService }],
    );
  });

  afterAll(async () => app.close());

  it.each([
    {
      name: "POST /contact",
      status: 201,
      body: contact,
      send: () =>
        request(app.getHttpServer())
          .post("/contact")
          .send({ email: contact.email }),
    },
    {
      name: "GET /contact",
      status: 200,
      body: contact,
      send: () => request(app.getHttpServer()).get("/contact"),
    },
    {
      name: "PATCH /contact",
      status: 200,
      body: update,
      send: () =>
        request(app.getHttpServer())
          .patch("/contact")
          .send({ email: "updated@example.com" }),
    },
    {
      name: "DELETE /contact",
      status: 200,
      body: remove,
      send: () => request(app.getHttpServer()).delete("/contact"),
    },
  ])(
    "$name returns its status and response body",
    async ({ send, status, body }) => {
      await send().expect(status).expect(body);
    },
  );
});
