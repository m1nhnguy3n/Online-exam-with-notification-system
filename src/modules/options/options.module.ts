import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Option } from 'src/entities/option.entity';
import { QuestionsModule } from '../questions/questions.module';

@Module({
  imports:[TypeOrmModule.forFeature([Option]), UserModule,QuestionsModule],
  controllers: [OptionsController],
  providers: [OptionsService],
})
export class OptionsModule {}
