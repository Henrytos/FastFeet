import { ApiProperty } from '@nestjs/swagger'

export class DeliveryAddressBodyDTO {
  @ApiProperty({
    type: 'string',
    example: 'SP',
    description: 'State',
    required: true,
  })
  public state: string

  @ApiProperty({
    type: 'string',
    example: 'São Paulo',
    description: 'City',
    required: true,
  })
  public city: string

  @ApiProperty({
    type: 'string',
    example: 'Vila Mariana',
    description: 'Neighborhood',
    required: true,
  })
  public neighborhood: string

  @ApiProperty({
    type: 'string',
    example: 'Rua dos Bandeirantes',
    description: 'Street',
    required: true,
  })
  public street: string

  @ApiProperty({
    type: 'string',
    example: '01555-000',
    description: 'Zip Code',
    required: true,
  })
  public zip: string

  @ApiProperty({
    type: 'string',
    example: '23-A',
    description: 'Number',
    required: true,
  })
  public number: string

  @ApiProperty({
    type: 'string',
    example: '-22.911604',
    description: 'Latitude',
    format: 'number',
    required: true,
  })
  public latitude: string

  @ApiProperty({
    type: 'string',
    example: '-47.060223',
    description: 'Longitude',
    format: 'number',
    required: true,
  })
  public longitude: string
}
