import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { EnvService } from '../env/env.service'
import { z } from 'zod'
import { Role } from '@prisma/client'

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
  role: z.enum([Role.ADMINISTRATOR, Role.DELIVERY_MAN]),
})

export type UserPayload = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(envService: EnvService) {
    const publicKey = envService.get('JWT_PUBLIC_KEY')

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    })
  }

  async validate(payload: UserPayload) {
    return tokenPayloadSchema.parse(payload)
  }
}
