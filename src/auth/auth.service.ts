import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,  
      ) {}
    

    async login(userDto:CreateUserDto){
        return {}
    }

    async register(userDto:CreateUserDto){
        const candidate = await this.usersService.getUserByEmail(userDto.email);
        if (candidate){
            throw new HttpException('User with specified email already exists', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.usersService.create({
            ...userDto,
            password:hashPassword
        })
        return this.generateToken(user)
    }

    generateToken(user:User){
        const payload = {
            email : user.email,
            id: user.id,
            roles:user.roles
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }

}
