import { ApiProperty } from '@nestjs/swagger'

export class AccessTokenResponseDTO {
  @ApiProperty({
    title: 'accessToken',
    description: 'accessToken',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string
}
