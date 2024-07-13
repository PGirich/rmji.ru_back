import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsString } from 'class-validator'

export class BanUserDto {
  @ApiProperty({ example: '234', description: 'User id' })
  @IsNumber({}, { message: 'User ID must be number!' })
  readonly userId: number

  @ApiProperty({ example: true, description: 'Ban attribute' })
  @IsBoolean({ message: 'Ban attribute must be boolean!' })
  readonly banned: boolean

  @ApiProperty({ example: 'Нецензурная брань', description: 'Ban reason' })
  @IsString({ message: 'Ban reason must be string!' })
  readonly banReason: string
}
