import { afterAll, beforeAll, describe, it, jest } from "@jest/globals";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { ChaletService } from "../chalet/chalet.service";
import { ChambresService } from "../chambres/chambres.service";
import { InfosService } from "../infos/infos.service";
import { createEndpointApp } from "../../test/endpoint-test.helpers";
import { PublicController } from "./public.controller";
import { PublicService } from "./public.service";

describe("Public endpoint", () => {
  let app: INestApplication;
  const sourceData = {
    chalet: {
      id: 1,
      animaux: [{ id: 1, nom: "Chat" }],
    },
    chambres: [
      {
        numero: 1,
        lits: [
          {
            chambreNumero: 1,
            litId: 1,
            nombre: 2,
            lit: { id: 1, nom: "Double" },
          },
        ],
        animaux: [{ id: 1, nom: "Chat" }],
      },
    ],
    infos: {
      id: 1,
      postal: "12345",
    },
  };
  const data = {
    chalet: {
      animaux: [{ nom: "Chat" }],
    },
    chambres: [
      {
        numero: 1,
        lits: [{ nombre: 2, lit: { nom: "Double" } }],
        animaux: [{ nom: "Chat" }],
      },
    ],
    infos: {
      postal: "12345",
    },
  };
  const chaletService = {
    findOne: jest
      .fn<() => Promise<typeof sourceData.chalet>>()
      .mockResolvedValue(sourceData.chalet),
  };
  const chambresService = {
    findAll: jest
      .fn<() => Promise<typeof sourceData.chambres>>()
      .mockResolvedValue(sourceData.chambres),
  };
  const infosService = {
    findOne: jest
      .fn<() => Promise<typeof sourceData.infos>>()
      .mockResolvedValue(sourceData.infos),
  };

  beforeAll(async () => {
    app = await createEndpointApp(
      [PublicController],
      [
        { provide: ChaletService, useValue: chaletService },
        { provide: ChambresService, useValue: chambresService },
        { provide: InfosService, useValue: infosService },
        PublicService,
      ],
    );
  });

  afterAll(async () => app.close());

  it("returns chalet, chambres, infos, and their loaded relations as one document", async () => {
    await request(app.getHttpServer()).get("/public").expect(200).expect(data);
  });
});
