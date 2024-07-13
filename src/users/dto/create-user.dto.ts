import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, IsStrongPassword, MaxLength } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User e-mail' })
  @IsString({ message: 'E-mail must be string!' })
  @IsEmail({}, { message: 'Invalid e-mail!' })
  readonly email: string

  @ApiProperty({ example: '123', description: 'User password' })
  @MaxLength(12, { message: 'Maximum length id 12 symbols!' })
  @IsStrongPassword({ minLength: 6 })
  readonly password: string
}
