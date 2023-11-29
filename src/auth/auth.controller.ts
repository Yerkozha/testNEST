import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/users.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}


    @Post('/login')
    login( @Body() loginCredentials: UserDto ) {
        return this.authService.login(loginCredentials)
    }

    @Post('/register')
    @UsePipes(ValidationPipe)
    register( @Body() registerCred: UserDto ) {
        return this.authService.register(registerCred)
    }
}
