import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { UserModule } from '../user/user.module';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Question,User]), UserModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, JwtService],
  exports:[QuestionsService]
})
export class QuestionsModule {}
