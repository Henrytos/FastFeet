import { ApiProperty } from '@nestjs/swagger'

export class RecipientDTO {
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the recipient',
    format: 'uuid',
    required: true,
  })
  public id: string

  @ApiProperty({
    type: 'string',
    example: 'John Doe',
    description: 'Name of the recipient',
    required: true,
  })
  public name: string

  @ApiProperty({
    type: 'string',
    example: 'johndoe@example.com',
    description: 'Email of the recipient',
    format: 'email',
    required: true,
  })
  public email: string
}
