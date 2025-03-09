import { ApiProperty } from '@nestjs/swagger'

export class AdministratorCreatedResponseDTO {
  @ApiProperty({
    type: String,
    description: 'Administrator created successfully',
    example: 'Administrator created successfully',
  })
  public message: string
}
