import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User e-mail' })
  readonly email: string
  @ApiProperty({ example: '123', description: 'User password' })
  readonly password: string
}
