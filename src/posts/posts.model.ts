import { ApiProperty } from '@nestjs/swagger'
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { User } from 'src/users/users.model'

interface PostCreationAttributes {
  title: string
  content: string
  image: string
  userId: number
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttributes> {

  @ApiProperty({ example: '1', description: 'Post ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ApiProperty({ example: 'My opinion here', description: 'Post title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string

  @ApiProperty({ example: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING CULPA', description: 'Post content' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string

  @ApiProperty({ example: '??', description: 'Image' })
  @Column({
    type: DataType.STRING
  })
  image: string

  @ApiProperty({ example: '13', description: 'User ID of post author' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number

  @BelongsTo(() => User)
  author: User
}
