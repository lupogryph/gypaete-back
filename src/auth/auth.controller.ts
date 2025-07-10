import {Body, Controller, Get, Post, Request} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {Public} from "./public.decorator";
import {Auth} from "./dto/auth.dto";
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {TokenDto} from "./dto/token.dto";

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiOkResponse({type: TokenDto})
    @Public()
    @Post()
    connecter(@Body() auth: Auth) {
        return this.authService.connecter(auth.email, auth.password);
    }

    @Get()
    getProfile(@Request() req) {
        return req.user;
    }
}
