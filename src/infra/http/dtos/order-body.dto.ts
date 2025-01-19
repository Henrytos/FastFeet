import { ApiProperty } from '@nestjs/swagger'

export class OrderBodyDTO {
  @ApiProperty({
    type: 'string',
    example: '4984c101-82f5-49d3-bc33-a8bc0d1eba60',
    description: 'id of the order',
    required: true,
  })
  public id: string

  @ApiProperty({
    type: 'string',
    example: '4984c101-82f5-49d3-bc33-a8bc0d1eba60',
    description: 'id of the delivery man',
    format: 'uuid',
    required: false,
  })
  public deliveryManId: string

  @ApiProperty({
    type: 'string',
    example: '4984c101-82f5-49d3-bc33-a8bc0d1eba60',
    description: 'id of the recipient',
    format: 'uuid',
    required: false,
  })
  public recipientId: string

  @ApiProperty({
    type: 'string',
    example: '4984c101-82f5-49d3-bc33-a8bc0d1eba60',
    description: 'id of the delivery address',
    format: 'uuid',
    required: false,
  })
  public deliveryAddressId: string

  @ApiProperty({
    type: 'string',
    example: '4984c101-82f5-49d3-bc33-a8bc0d1eba60',
    description: 'id of the photo',
    format: 'uuid',
    required: false,
  })
  public photoId: string

  @ApiProperty({
    type: 'string',
    enum: ['pending', 'withdrawn', 'delivered', 'canceled'],
    example: 'pending',
    description: 'status of the order',
  })
  public status: string

  @ApiProperty({
    type: 'string',
    example: '2022-01-01T10:00:00.000Z',
    description: 'delivery at of the order',
    format: 'date-time',
    required: false,
  })
  public deliveryAt: Date

  @ApiProperty({
    type: 'string',
    example: '2022-01-01T10:00:00.000Z',
    description: 'withdrawn at of the order',
    format: 'date-time',
    required: false,
  })
  public withdrawnAt: Date

  @ApiProperty({
    type: 'string',
    example: '2022-01-01T10:00:00.000Z',
    description: 'updated at of the order',
    format: 'date-time',
    required: false,
  })
  public updatedAt: Date

  @ApiProperty({
    type: 'string',
    example: '2022-01-01T10:00:00.000Z',
    description: 'created at of the order',
    format: 'date-time',
    required: true,
  })
  public createdAt: Date
}
