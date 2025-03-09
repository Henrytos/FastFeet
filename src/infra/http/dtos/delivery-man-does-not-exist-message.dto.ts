import { UseCaseError } from '@/core/errors/use-case-error'
import { ApiProperty } from '@nestjs/swagger'

export class DeliveryManDoesNotExistMessageDTO implements UseCaseError {
  @ApiProperty({
    type: String,
    description: 'DeliveryMan does not exist',
    example: 'DeliveryMan does not exist',
  })
  message: string
}
