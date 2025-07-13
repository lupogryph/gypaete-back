import {Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiProperty, ApiTags} from "@nestjs/swagger";
import {LocalAuthGuard} from "./local-auth.guard";
import {Public} from "./public.decorator";

class LoginDto {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiBody({type: LoginDto})
    @UseGuards(LocalAuthGuard)
    @Public()
    @Post()
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @ApiBearerAuth()
    @Get()
    profile(@Request() req) {
        return req.user;
    }

}
