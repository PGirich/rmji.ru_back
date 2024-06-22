import { Injectable } from '@nestjs/common';
import { Role } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/dto';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private rolesRepo: typeof Role ){}

    async create(dto: CreateRoleDto) {
        const role = this.rolesRepo.create(dto)
        return role
    }
    async getByValue(value: string) {
        const role = await this.rolesRepo.findOne( { where: { value } } )
        return role     
    }
}
