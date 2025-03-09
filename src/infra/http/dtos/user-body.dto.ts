import { ApiProperty } from '@nestjs/swagger'

export class UserBodyDTO {
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'id of the user',
    required: true,
    format: 'uuid',
  })
  public id: string

  @ApiProperty({
    type: 'string',
    example: 'John Doe',
    description: 'name of the user',
    required: true,
  })
  public name: string

  @ApiProperty({
    type: 'string',
    example: '123.456.789-00',
    description: 'cpf of the user',
    required: true,
    pattern: '/^(d{3}.d{3}.d{3}-d{2})$/',
  })
  public cpf: string

  @ApiProperty({
    type: 'string',
    example: 'ADMINISTRATOR',
    description: 'role of the user',
    required: true,
    enum: ['ADMINISTRATOR', 'DELIVERY_MAN'],
    default: 'ADMINISTRATOR',
  })
  public role: string

  @ApiProperty({
    type: 'string',
    example: '2022-01-01T12:00:00.000Z',
    description: 'date and time of creation',
    required: true,
    format: 'date-time',
  })
  public createdAt: string

  @ApiProperty({
    type: 'string',
    example: '2022-01-01T12:00:00.000Z',
    description: 'date and time of last update',
    required: false,
    format: 'date-time',
  })
  public updatedAt: string
}
