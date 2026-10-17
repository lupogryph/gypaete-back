import { afterAll, beforeAll, describe, it, jest } from "@jest/globals";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { PhotoController } from "./photo.controller";
import { PhotoService } from "./photo.service";
import { createEndpointApp } from "../../test/endpoint-test.helpers";

describe("Photo endpoints (e2e)", () => {
  let app: INestApplication;
  const space = { total: 100, used: 25, left: 75 };
  const remove = { affected: 1 };
  const photoService = {
    space: jest.fn<() => Promise<typeof space>>().mockResolvedValue(space),
    deletePhoto: jest
      .fn<() => Promise<typeof remove>>()
      .mockResolvedValue(remove),
  };

  beforeAll(async () => {
    app = await createEndpointApp(
      [PhotoController],
      [{ provide: PhotoService, useValue: photoService }],
    );
  });

  afterAll(async () => app.close());

  it("GET /photo/space returns 200 and the space totals", async () => {
    await request(app.getHttpServer())
      .get("/photo/space")
      .expect(200)
      .expect(space);
  });

  it("DELETE /photo/:id returns 200 and the deletion result", async () => {
    await request(app.getHttpServer())
      .delete("/photo/photo-id")
      .expect(200)
      .expect(remove);
  });
});
