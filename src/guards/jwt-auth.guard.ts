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
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    console.log("xxxxxxx",token);

    if (!token) {
      throw new BadRequestException(ERRORS_DICTIONARY.TOKEN_ERROR);
    }

    try {
      const payload = this.jwtService.verify(token);
      console.log("PAYLOAD NE: ", payload)
      const user = await this.userRepository.findOneBy(payload.userId)

      if(!user) {
        throw new BadRequestException(ERRORS_DICTIONARY.TOKEN_ERROR);
      }

      request.user = user;

      return true;
    } catch(error) {
      console.log(error.message);

      throw new BadRequestException(error.message)
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
