import { UseCaseError } from '@/core/errors/use-case-error'
import { ApiProperty } from '@nestjs/swagger'

export class AdministratorDoesNotExistMessageDTO implements UseCaseError {
  @ApiProperty({
    type: String,
    description: 'Administrator does not exist',
    example: 'Administrator does not exist',
  })
  message: string
}
