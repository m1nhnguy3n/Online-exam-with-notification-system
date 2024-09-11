import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { ERRORS_DICTIONARY } from 'src/constraints/error-dictionary.constraint';
import { User } from 'src/entities/user.entity';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { Repository } from 'typeorm';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private configService: ApiConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new BadRequestException(ERRORS_DICTIONARY.TOKEN_ERROR);
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.getString('JWT_SECRET_KEY')
      });
      const user = await this.userRepository.findOneBy({
        id: payload.userId
      });

      if (!user) {
        throw new BadRequestException(ERRORS_DICTIONARY.TOKEN_ERROR);
      }
      request.user = payload;

      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
