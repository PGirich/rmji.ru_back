import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { User } from 'src/users/users.model'
import { Role } from './roles.model'

interface UserRolesCreationAttributes {
  userid: number
  roleid: number
}

@Table({ tableName: 'userroles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles, UserRolesCreationAttributes> {
  @ApiProperty({ example: '132', description: 'User role record id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ApiProperty({ example: '1', description: 'User id' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userid: number

  @ApiProperty({ example: '13', description: 'Role id' })
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleid: number
}
