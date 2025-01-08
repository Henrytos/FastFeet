import { UseCaseError } from '@/core/errors/use-case-error'
import { ApiProperty } from '@nestjs/swagger'

export class OrderDoesNotExistMessageDTO implements UseCaseError {
  @ApiProperty({
    description: 'Order does not exist',
    example: 'Order does not exist',
  })
  public message: string
}
