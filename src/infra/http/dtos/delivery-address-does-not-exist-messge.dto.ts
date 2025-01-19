import { ApiProperty } from '@nestjs/swagger'

export class DeliveryAddressDoesNotExistMessageDTO {
  @ApiProperty({
    type: 'string',
    example: 'Delivery address does not exist',
    description: 'Message that delivery address does not exist',
    required: true,
  })
  public message: string
}
