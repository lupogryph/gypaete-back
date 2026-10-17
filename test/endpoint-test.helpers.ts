import { INestApplication, Provider, Type } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { LocalAuthGuard } from "../src/auth/local-auth.guard";
import { RolesGuard } from "../src/auth/role.guard";

export const authenticatedUser = {
  id: 7,
  email: "user@example.com",
  role: "admin",
};

export async function createEndpointApp(
  controllers: Type[],
  providers: Provider[],
): Promise<INestApplication> {
  const moduleFixture = await Test.createTestingModule({
    controllers,
    providers,
  })
    .overrideGuard(LocalAuthGuard)
    .useValue({ canActivate: true })
    .overrideGuard(RolesGuard)
    .useValue({ canActivate: true })
    .compile();

  const app = moduleFixture.createNestApplication();
  app.use((req, _res, next) => {
    req.user = authenticatedUser;
    next();
  });
  await app.init();
  return app;
}
