import { ApiProperty } from '@nestjs/swagger'

export class CreateUserBodyDTO {
  @ApiProperty({
    type: 'string',
    example: 'jhon',
    description: 'name of the user',
  })
  public name: string

  @ApiProperty({
    type: 'string',
    example: '123.456.789-00',
    description: 'cpf of the user',
  })
  public cpf: string

  @ApiProperty({
    type: 'string',
    example: ' 123456',
    description: 'password of the user',
  })
  public password: string
}
