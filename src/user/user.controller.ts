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

    // todo: remove this method as only admin should be able to create users
    @ApiOkResponse({type: UserDto})
    @Public() // todo: remove this decorator when user registration is not needed
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        delete createUserDto.role;
        return this.userService.create(createUserDto);
    }

    @ApiOkResponse({type: UserDto})
    @Get()
    find(@Request() req) {
        return this.userService.findById(req.user.id);
    }

    @Patch()
    update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        delete updateUserDto.role; // prevent role change
        return this.userService.update(req.user.id, updateUserDto);
    }

    @Delete()
    remove(@Request() req) {
        return this.userService.remove(req.user.id);
    }
}
