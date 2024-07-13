import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString, isNumberString, IsString, Length } from 'class-validator'

export class CreatePostDto {
  @ApiProperty({ example: 'My opinion here', description: 'Post title' })
  @IsString({ message: 'Title must be string!' })
  @Length(3,250,{message: 'Title must be from 3 to 250 char length!'})
  title: string

  @ApiProperty({ example: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING CULPA', description: 'Post content' })
  @IsString({ message: 'Post content must be string!' })
  content: string

  @ApiProperty({ example: '13', description: 'User ID of post author' })
  @IsNumberString({}, {message: 'User ID must be a number!'})
  userId: number
}
