import { ApiProperty } from '@nestjs/swagger'

export class RecipientBodyDTO {
  @ApiProperty({
    type: String,
    example: 'John Doe',
    description: 'Name of the recipient',
  })
  public name: string

  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
    description: 'Email of the recipient',
  })
  public email: string
}
