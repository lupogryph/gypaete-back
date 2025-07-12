import {Body, Controller, Delete, Get, Patch, Post, Request,} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {UserDto} from "./dto/user.dto";
import {Public} from "../auth/public.decorator";

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @ApiOkResponse({type: UserDto})
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        delete createUserDto.role;
        return this.userService.create(createUserDto);
    }

    @ApiOkResponse({type: UserDto})
    @Get()
    find(@Request() req) {
        return this.userService.findById(req.user.sub);
    }

    @Patch()
    update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        delete updateUserDto.role; // prevent role change
        return this.userService.update(req.user.sub, updateUserDto);
    }

    @Delete()
    remove(@Request() req) {
        return this.userService.remove(req.user.sub);
    }
}
