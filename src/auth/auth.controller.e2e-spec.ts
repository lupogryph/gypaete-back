import { afterAll, beforeAll, describe, it, jest } from "@jest/globals";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import {
  authenticatedUser,
  createEndpointApp,
} from "../../test/endpoint-test.helpers";

describe("Auth endpoints (e2e)", () => {
  let app: INestApplication;
  const token = { access_token: "test-token" };
  const authService = {
    login: jest.fn<() => Promise<typeof token>>().mockResolvedValue(token),
  };

  beforeAll(async () => {
    app = await createEndpointApp(
      [AuthController],
      [{ provide: AuthService, useValue: authService }],
    );
  });

  afterAll(async () => app.close());

  it("POST /auth returns 201 and the access token", async () => {
    await request(app.getHttpServer())
      .post("/auth")
      .type("form")
      .send({ email: authenticatedUser.email, password: "password" })
      .expect(201)
      .expect(token);
  });

  it("POST /auth returns 401", async () => {
    authService.validateUser.mockResolvedValueOnce(null);

    await request(app.getHttpServer())
        .post("/auth")
        .type("form")
        .send({ email: "unknown@example.com", password: "wrong-password" })
        .expect(401)
        .expect({ statusCode: 401, message: "Unauthorized" });
  });

  it("GET /auth returns 200 and the current user", async () => {
    await request(app.getHttpServer())
      .get("/auth")
      .expect(200)
      .expect(authenticatedUser);
  });
});
