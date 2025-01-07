import { ApiProperty } from '@nestjs/swagger'

export class AuthenticateBodyDto {
  @ApiProperty({
    title: 'cpf person',
    minimum: 11,
    maximum: 11,
    description: 'cpf',
    example: '12345678901',
  })
  cpf: string

  @ApiProperty({
    title: 'password person',
    description: 'password',
    example: '123456',
    minLength: 6,
    maxLength: 20,
  })
  password: string
}
