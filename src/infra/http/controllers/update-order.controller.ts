import { Controller, UseGuards } from '@nestjs/common'
import { Roles } from '../guards/roles.decorator'
import { RolesGuards } from '../guards/roles.guards'

@Controller('orders/:orderId')
export class UpdateOrderCOntroller {
  // constructor(private readonly updateOrderUseCase: UpdateOrderUseCase) {}

  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuards)
  async handler() {}
}
