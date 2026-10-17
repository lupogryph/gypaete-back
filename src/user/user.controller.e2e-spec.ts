import {afterAll, beforeAll, describe, it, jest} from "@jest/globals";
import {INestApplication} from "@nestjs/common";
import {APP_GUARD} from "@nestjs/core";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {Test} from "@nestjs/testing";
import request from "supertest";
import jwtConfig from "../auth/jwt.config";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {JwtStrategy} from "../auth/jwt.strategy";
import {RolesGuard} from "../auth/role.guard";
import {authenticatedUser} from "../../test/endpoint-test.helpers";
import {UserAdminController} from "./user.admin.controller";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";

describe("User endpoints (e2e)", () => {
  let app: INestApplication;
  let authorization: string;
  const user = { id: 7, email: authenticatedUser.email };
  const jwtSecret = "test-secret";
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
    const moduleFixture = await Test.createTestingModule({
      imports: [PassportModule, JwtModule.register({ secret: jwtSecret })],
      controllers: [UserController, UserAdminController],
      providers: [
        { provide: UserService, useValue: userService },
        {
          provide: jwtConfig.KEY,
          useValue: { secret: jwtSecret, expiresIn: "1h" },
        },
        JwtStrategy,
        { provide: APP_GUARD, useClass: JwtAuthGuard },
        { provide: APP_GUARD, useClass: RolesGuard },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const jwtService = app.get(JwtService);
    authorization = `Bearer ${jwtService.sign({
      sub: authenticatedUser.id,
      email: authenticatedUser.email,
      role: authenticatedUser.role,
    })}`;
  });

  afterAll(async () => app.close());

  it.each([
    {
      name: "GET /user",
      status: 200,
      body: user,
      send: () =>
        request(app.getHttpServer())
          .get("/user")
          .set("Authorization", authorization),
    },
    {
      name: "GET /user without auth",
      status: 401,
      body: { message: 'Unauthorized', statusCode: 401 },
      send: () =>
          request(app.getHttpServer())
            .get("/user"),
    },
    {
      name: "PATCH /user",
      status: 200,
      body: update,
      send: () =>
        request(app.getHttpServer())
          .patch("/user")
          .set("Authorization", authorization)
          .send({ email: "updated@example.com" }),
    },
    {
      name: "DELETE /user",
      status: 200,
      body: remove,
      send: () =>
        request(app.getHttpServer())
          .delete("/user")
          .set("Authorization", authorization),
    },
  ])(
    "$name returns its status and response body",
    async ({ send, status, body }) => {
      await send().expect(status).expect(body);
    },
  );
});
