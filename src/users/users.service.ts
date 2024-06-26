import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './users.model'
import { CreateUserDto } from './dto/dto'
import { RolesService } from 'src/roles/roles.service'

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
    return user
  }
  async getAll() {
    const users = await this.usersRepo.findAll({ include: { all: true } })
    return users
  }

  async getUserByEmail(email:string){
    const user = await this.usersRepo.findOne({ where:  { email  }, include : {all:true}  })
    return user
  }
}
