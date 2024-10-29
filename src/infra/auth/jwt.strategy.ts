import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { EnvService } from "../env/env.service";
import { z } from "zod";
import { Role } from "@prisma/client";

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
  role: z.enum([Role.ADMINISTRATOR, Role.DELIVERY_MAN]),
});

export type UserPayload = z.infer<typeof tokenPayloadSchema>;

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(envService: EnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envService.get("JWT_SECRET_KEY"),
    });
  }

  async validate(payload: UserPayload) {
    return tokenPayloadSchema.parse(payload);
  }
}
