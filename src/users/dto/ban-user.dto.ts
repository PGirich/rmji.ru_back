import { ApiProperty } from '@nestjs/swagger'

export class BanUserDto {
  @ApiProperty({ example: '234', description: 'User id' })
  readonly userId: number
  @ApiProperty({ example: true, description: 'Ban attribute' })
  readonly banned: boolean
  @ApiProperty({ example: 'Нецензурная брань', description: 'Ban reason' })
  readonly banReason: string
}
