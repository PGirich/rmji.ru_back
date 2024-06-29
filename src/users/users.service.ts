import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './users.model'
import { CreateUserDto } from './dto/create-user.dto'
import { RolesService } from 'src/roles/roles.service'
import { AddRoleDto } from './dto/add-role.dto'
import { BanUserDto } from './dto/ban-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private usersRepo: typeof User,
    private rolesService: RolesService
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.usersRepo.create(dto)
    const role = await this.rolesService.getByValue('USER')
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user
  }
  async getAll() {
    const users = await this.usersRepo.findAll({ include: { all: true } })
    return users
  }

  async addRole(dto:AddRoleDto) {
    const user = await this.usersRepo.findByPk(dto.userId)
    const role = await this.rolesService.getByValue(dto.value)
    if (user && role) {
      await user.$add('role', role.id)
      return dto
    }
    throw new HttpException(`User or role not found...`, HttpStatus.NOT_FOUND)
  }

  async banUser(dto:BanUserDto) {
    const user = await this.usersRepo.findByPk(dto.userId)
    if (user) {
      await user.$set('banned', dto.banned?'true':'false')
      await user.$set('banReason', dto.banReason)
      return dto
    }
    throw new HttpException(`User not found...`, HttpStatus.NOT_FOUND)


    const role = await this.rolesService.getByValue('USER')
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepo.findOne({
      where: { email },
      include: { all: true },
    })
    return user
  }
}
