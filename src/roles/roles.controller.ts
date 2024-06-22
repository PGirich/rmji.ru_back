import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/dto';
import { Role } from './roles.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService){}

    @ApiOperation({ summary: 'Create a role' })
    @ApiResponse({ status: 200, type: Role })
    @Post()
    create(@Body() roleDto: CreateRoleDto) {
      return this.roleService.create(roleDto)
    }

    @ApiOperation({ summary: 'Get role by value' })
    @ApiResponse({ status: 200, type: Role })
    @Get('/:value')
    getByValue(@Param('value') value: string) {
      return this.roleService.getByValue(value)
    }

}
