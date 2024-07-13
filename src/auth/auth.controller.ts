import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.model';

@ApiTags('Authorizing of user')
@Controller('auth')
export class AuthController {

    constructor(@Inject() private authService:AuthService) {

     }

    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, type: User })
    @Post('/login')
    login(@Body() userDto:CreateUserDto){
        return this.authService.login(userDto)
    }

    @ApiOperation({ summary: 'User registration' })
    @ApiResponse({ status: 200, type: User })
    @Post('/register')
    register(@Body() userDto:CreateUserDto){
        return this.authService.register(userDto)
    }

}
