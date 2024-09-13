import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from 'src/entities/option.entity';
import { QuestionsModule } from '../questions/questions.module';
import { UsersModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Option]), UsersModule, QuestionsModule],
  controllers: [OptionsController],
  providers: [OptionsService, JwtService]
})
export class OptionsModule {}
