import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './users.model'
import { RolesGuard } from 'src/auth/role.guard'
import { Roles } from 'src/auth/roles-auth.decorator'
import { AddRoleDto } from './dto/add-role.dto'
import { BanUserDto } from './dto/ban-user.dto'
import { ValidationPipe } from 'src/pipes/validation.pipe'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto)
  }

  @ApiOperation({ summary: 'Get all users (ADMIN role required)' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAll()
  }

  @ApiOperation({ summary: 'Grant role to user (ADMIN role required)' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/grant')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto)
  }
  
  @ApiOperation({ summary: 'Ban/unban user (ADMIN role required)' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  banUser(@Body() banUserDto: BanUserDto) {
    return this.usersService.banUser(banUserDto)
  }
}
