import {PartialType} from '@nestjs/mapped-types';
import {CreateChaletDto} from './create-chalet.dto';

export class UpdateChaletDto extends PartialType(CreateChaletDto) {
}
