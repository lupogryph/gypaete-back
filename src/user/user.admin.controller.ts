import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/role.decorator";
import {Role} from "../auth/roles.enum";
import {User} from "./entities/user.entity";
import {RolesGuard} from "../auth/role.guard";

@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
@ApiTags('user')
@Controller('admin/user')
export class UserAdminController {
    constructor(private readonly userService: UserService) {
    }

    @ApiOkResponse({type: User})
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @ApiOkResponse({type: User, isArray: true})
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @ApiOkResponse({type: User})
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.userService.findById(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':email')
    remove(@Param('email') id: number) {
        return this.userService.remove(id);
    }
}
