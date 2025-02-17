import { ApiHeaderOptions } from '@nestjs/swagger'

export const FORMAT_TOKEN_DTO: ApiHeaderOptions = {
  name: 'Authorization',
  description: 'Bearer token',
  schema: {
    type: 'string',
  },
  required: true,
  example:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpvaG4iOnsicmVxdWVzdCI6MTQ3ODk5OTk5NTIifQ',
}
