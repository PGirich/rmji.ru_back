import { ApiProperty } from '@nestjs/swagger'

export class AddRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role to add' })
  readonly value: string
  @ApiProperty({ example: '234', description: 'User id' })
  readonly userId: number
}
