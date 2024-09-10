import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfigService } from 'src/shared/services/api-config.service';

@Module({
  imports: [ TypeOrmModule.forFeature([User]),

      JwtModule.registerAsync({
          useFactory: (configService: ApiConfigService) => ({
            secret: configService.getString('JWT_SECRET_KEY'),
            signOptions: { expiresIn: '15d' },
          }),
          inject: [ApiConfigService]
      })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
