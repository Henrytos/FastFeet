import { ApiProperty } from '@nestjs/swagger'

export class DeliveryManBodyDTO {
  @ApiProperty({
    type: 'string',
    description: 'name delivery man',
    example: 'John Doe',
  })
  public name: string

  @ApiProperty({
    type: 'string',
    description: 'password delivery man',
    example: '123456',
  })
  public password: string

  @ApiProperty({
    type: 'string',
    description: 'cpf delivery man',
    example: '123.456.789-10',
  })
  public cpf: string
}
