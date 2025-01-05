import { Public } from '@/infra/auth/public'
import { Controller, Get } from '@nestjs/common'

@Public()
@Controller('/')
export class HelloWorldController {
  @Get()
  async handler() {
    return 'Hello World'
  }
}
