import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRole } from './user.entity';

export interface JwtPayload {
  sub: number;
  username: string;
  role: UserRole;
  relatedId?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    });
  }

  async validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
      relatedId: payload.relatedId,
    };
  }
}
