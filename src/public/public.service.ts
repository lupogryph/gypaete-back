import { Injectable } from "@nestjs/common";
import { ChaletService } from "../chalet/chalet.service";
import { CHALET_SINGLE_ID } from "../chalet/chalet.constants";
import { ChambresService } from "../chambres/chambres.service";
import { InfosService } from "../infos/infos.service";

function omitIdentifiers(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(omitIdentifiers);
  }
  if (value === null || typeof value !== "object" || value instanceof Date) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(
        ([key]) =>
          key !== "id" && key !== "chambreNumero" && !key.endsWith("Id"),
      )
      .map(([key, nestedValue]) => [key, omitIdentifiers(nestedValue)]),
  );
}

@Injectable()
export class PublicService {
  constructor(
    private readonly chaletService: ChaletService,
    private readonly chambresService: ChambresService,
    private readonly infosService: InfosService,
  ) {}

  async find() {
    const [chalet, chambres, infos] = await Promise.all([
      this.chaletService.findOne(CHALET_SINGLE_ID),
      this.chambresService.findAll(),
      this.infosService.findOne(InfosService.SINGLE_ID),
    ]);

    return omitIdentifiers({ chalet, chambres, infos });
  }
}
