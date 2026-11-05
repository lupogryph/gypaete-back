import { Repository } from "typeorm";
import { InfosService } from "./infos.service";
import { Info } from "./entities/info.entity";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

describe("InfosService", () => {
  let service: InfosService;
  let repository: {
    create: jest.Mock<(info: Partial<Info>) => Info>;
    save: jest.Mock<(info: Partial<Info>) => Promise<Info>>;
    find: jest.Mock<() => Promise<Info[]>>;
    findOneBy: jest.Mock<(where: Partial<Info>) => Promise<Info | null>>;
    delete: jest.Mock<(id: number) => Promise<{ affected?: number }>>;
  };

  beforeEach(() => {
    repository = {
      create: jest.fn<(info: Partial<Info>) => Info>(),
      save: jest.fn<(info: Partial<Info>) => Promise<Info>>(),
      find: jest.fn<() => Promise<Info[]>>(),
      findOneBy: jest.fn<(where: Partial<Info>) => Promise<Info | null>>(),
      delete: jest.fn<(id: number) => Promise<{ affected?: number }>>(),
    };
    service = new InfosService(repository as unknown as Repository<Info>);
  });

  it("creates only the singleton record with id 1", async () => {
    const dto = {
      postal: "880 Route de la Culaz",
      phoneNumbers: ["+33632218402"],
      email: "hello@example.com",
      socialNetworks: { facebook: "https://facebook.com/id/123456" },
    };
    const entity = { ...dto, id: 1 };
    repository.create.mockReturnValue(entity);
    repository.save.mockResolvedValue(entity);

    await expect(service.create(dto)).resolves.toEqual(entity);
    expect(repository.create).toHaveBeenCalledWith(entity);
    expect(repository.save).toHaveBeenCalledWith(entity);
  });

  it("updates existing singleton fields only", async () => {
    const existing = {
      id: 1,
      postal: "Old address",
      phoneNumbers: [],
      email: "hello@example.com",
      socialNetworks: {},
    };
    const updated = { ...existing, postal: "New address" };
    repository.findOneBy.mockResolvedValue(existing);
    repository.save.mockResolvedValue(updated);

    await expect(service.update(1, { postal: "New address" })).resolves.toEqual(
      updated,
    );
    expect(repository.save).toHaveBeenCalledWith(updated);
  });

  it("does not allow reading or mutating another id", async () => {
    await expect(service.findOne(2)).rejects.toThrow("Info 2 not found");
    await expect(service.update(2, { postal: "Address" })).rejects.toThrow(
      "Info 2 not found",
    );
    await expect(service.remove(2)).rejects.toThrow("Info 2 not found");
    expect(repository.findOneBy).not.toHaveBeenCalled();
    expect(repository.save).not.toHaveBeenCalled();
    expect(repository.delete).not.toHaveBeenCalled();
  });

  it("does not create when updating a missing singleton", async () => {
    repository.findOneBy.mockResolvedValue(null);

    await expect(service.update(1, { postal: "Address" })).rejects.toThrow(
      "Info 1 not found",
    );
    expect(repository.save).not.toHaveBeenCalled();
  });
});
