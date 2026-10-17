import { afterAll, beforeAll, describe, it, jest } from "@jest/globals";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { PassportModule } from "@nestjs/passport";
import request from "supertest";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { authenticatedUser } from "../../test/endpoint-test.helpers";

describe("Auth endpoints (e2e)", () => {
  let app: INestApplication;
  const token = { access_token: "test-token" };
  const validPassword = "correct-password";
  const authService = {
    validateUser: jest
      .fn<(email: string, password: string) => Promise<typeof authenticatedUser | null>>()
        .mockImplementation(async (email, password) =>
            email === authenticatedUser.email && password === validPassword ? authenticatedUser : null
        ),
    login: jest
      .fn<(user: typeof authenticatedUser) => Promise<typeof token>>()
      .mockResolvedValue(token),
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [PassportModule],
      controllers: [AuthController],
      providers: [
        LocalStrategy,
        { provide: AuthService, useValue: authService },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use((req, _res, next) => {
      req.user = authenticatedUser;
      next();
    });
    await app.init();
  });

  afterAll(async () => app.close());

  it("POST /auth returns 201 and the access token", async () => {
    await request(app.getHttpServer())
      .post("/auth")
      .type("form")
      .send({ email: authenticatedUser.email, password: validPassword })
      .expect(201)
      .expect(token);
  });

  it("POST /auth returns 401 for an unknown user", async () => {
    await request(app.getHttpServer())
      .post("/auth")
      .type("form")
      .send({ email: "unknown@example.com", password: validPassword })
      .expect(401)
      .expect({ statusCode: 401, message: "Unauthorized" });
  });

  it("POST /auth returns 401 for an incorrect password", async () => {
    await request(app.getHttpServer())
      .post("/auth")
      .type("form")
      .send({ email: authenticatedUser.email, password: "wrong-password" })
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
