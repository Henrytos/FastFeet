import { ApiProperty } from '@nestjs/swagger'

export class DeliveryManCreatedResponseDTO {
  @ApiProperty({
    type: String,
    description: 'DeliveryMan created successfully',
    example: 'DeliveryMan created successfully',
  })
  public message: string
}
