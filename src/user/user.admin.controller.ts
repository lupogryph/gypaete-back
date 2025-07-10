import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {UserDto} from "./dto/user.dto";
import {Roles} from "../auth/role.decorator";
import {Role} from "../auth/roles.enum";
import {RolesGuard} from "../auth/role.guard";

@ApiBearerAuth()
@ApiTags('admin')
@Controller('admin/user')
export class UserAdminController {
    constructor(private readonly userService: UserService) {
    }

    @ApiOkResponse({type: UserDto})
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @ApiOkResponse({type: UserDto, isArray: true})
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @ApiOkResponse({type: UserDto})
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.userService.findById(id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Patch(':id')
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.remove(+id);
    }
}
