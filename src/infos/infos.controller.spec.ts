import { InfosController } from "./infos.controller";
import { InfosService } from "./infos.service";
import { describe, expect, it, jest } from "@jest/globals";
import { InfoDto } from "./dto/info.dto";

describe("InfosController", () => {
  const info = {
    id: 1,
    postal: "880 Route de la Culaz",
    phoneNumbers: ["+33632218402"],
    email: "hello@example.com",
    socialNetworks: { facebook: "https://facebook.com/id/123456" },
  };

  it("returns InfoDto instances from endpoints that return infos", async () => {
    const service = {
      create: jest.fn<() => Promise<typeof info>>().mockResolvedValue(info),
      findAll: jest
        .fn<() => Promise<(typeof info)[]>>()
        .mockResolvedValue([info]),
      findOne: jest.fn<() => Promise<typeof info>>().mockResolvedValue(info),
      update: jest.fn<() => Promise<typeof info>>().mockResolvedValue(info),
      remove: jest.fn(),
    } as unknown as InfosService;
    const controller = new InfosController(service);

    expect(await controller.create(info)).toBeInstanceOf(InfoDto);
    expect(await controller.findAll()).toEqual([expect.any(InfoDto)]);
    expect(await controller.findOne(1)).toBeInstanceOf(InfoDto);
    expect(await controller.update(1, { postal: info.postal })).toBeInstanceOf(
      InfoDto,
    );
    expect(service.create).toHaveBeenCalledWith(info);
    expect(service.update).toHaveBeenCalledWith(1, { postal: info.postal });
  });

  it("should be defined", () => {
    const controller = new InfosController({} as InfosService);
    expect(controller).toBeDefined();
  });
});
