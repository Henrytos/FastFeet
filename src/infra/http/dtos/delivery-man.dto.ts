import { ApiProperty } from '@nestjs/swagger'

export class DeliveryManDTO {
  @ApiProperty({
    name: 'deliveryManId',
    example: 'd36f146f-c769-46cb-bb97-098709af6251',
    type: 'string',
    format: 'uuid',
    required: true,
  })
  public id: string

  @ApiProperty({
    name: 'cpf',
    example: '123.456.789-00',
    type: 'string',
    format: 'cpf',
    required: true,
  })
  public cpf: string

  @ApiProperty({
    name: 'name',
    example: 'John Doe',
    type: 'string',
    required: true,
  })
  public name: string

  @ApiProperty({
    name: 'role',
    example: 'DELIVERY_MAN',
    default: 'DELIVERY_MAN ',
    type: 'string',
    required: true,
  })
  public role: string
}
