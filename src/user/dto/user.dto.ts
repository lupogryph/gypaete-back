import {CreateUserDto} from "./create-user.dto";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../../auth/roles.enum";

export class UserDto extends CreateUserDto {

    @ApiProperty()
    id: number;

    @ApiProperty({enum: Role})
    role: Role

}
