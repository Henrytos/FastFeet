import { UseCaseError } from '@/core/errors/use-case-error'
import { ApiProperty } from '@nestjs/swagger'

export class WrongCredentialMessageDTO implements UseCaseError {
  @ApiProperty({
    type: String,
    description: 'Wrong credentials',
    example: 'Wrong credentials',
  })
  message: string
}
