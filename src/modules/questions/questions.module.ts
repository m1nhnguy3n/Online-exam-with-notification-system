import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { UserModule } from '../user/user.module';
<<<<<<< HEAD
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Question,User]), UserModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, JwtService],
=======

@Module({
  imports:[TypeOrmModule.forFeature([Question]), UserModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
>>>>>>> 2093662b89e7de74c0f20e969aa3af5d8b0e1cf7
  exports:[QuestionsService]
})
export class QuestionsModule {}
