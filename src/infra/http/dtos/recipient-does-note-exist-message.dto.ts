import { UseCaseError } from '@/core/errors/use-case-error'
import { ApiProperty } from '@nestjs/swagger'

export class RecipientDoesNotExistErrorMessageDTO implements UseCaseError {
  @ApiProperty({
    type: 'string',
    description: 'Recipient does not exist',
    example: 'Recipient does not exist',
  })
  public message: string
}
