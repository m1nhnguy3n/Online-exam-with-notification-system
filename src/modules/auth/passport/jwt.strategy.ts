import { ApiConfigService } from '@/shared/services/api-config.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ApiConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getString('JWT_SECRET_KEY')
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, role: payload.role };
  }
}
