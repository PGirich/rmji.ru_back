import { ApiProperty } from '@nestjs/swagger'
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript'
import { User } from 'src/users/users.model'
import { UserRoles } from './userroles.model'

interface RoleCreationAttributes {
  id: number
  value: string
  description: string
}

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Role extends Model<Role, RoleCreationAttributes> {
  @ApiProperty({ example: '1', description: 'User id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ApiProperty({ example: 'ADMIN', description: 'User role id' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string

  @ApiProperty({
    example: 'Basic user rights',
    description: 'Role description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string

  @BelongsToMany(() => User, () => UserRoles)
  users: User[]
}
