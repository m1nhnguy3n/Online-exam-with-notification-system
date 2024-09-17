import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';
import { MailService } from 'src/shared/services/mail.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ApiConfigService) => ({
        secret: configService.getString('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '15d' }
      }),
      inject: [ApiConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService]
})
export class AuthModule {}
