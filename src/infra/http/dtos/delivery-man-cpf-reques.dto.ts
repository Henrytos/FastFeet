import { ApiProperty } from '@nestjs/swagger'

export class DeliveryManCpfRequestDTO {
  @ApiProperty({
    description: 'CPF do entregador',
    required: true,
    example: '123.456.789-00',
    pattern: '/^(d{3}.d{3}.d{3}-d{2})$/,',
  })
  public cpf: string
}
