import { ApiProperty } from '@nestjs/swagger'

export class FetchSchemaDTO {
  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Page number',
    required: false,
    default: 1,
  })
  public page: number

  @ApiProperty({
    type: 'number',
    example: 10,
    description: 'Number of items per page',
    required: false,
    default: 10,
  })
  public perPage: number
}
