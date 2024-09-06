import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from 'src/entities/question.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class QuestionsService {
  constructor(@InjectRepository(Question) private questionRepository: Repository<Question>) {}
  async create(teacherId: string, createQuestionDto: CreateQuestionDto):Promise<Question> {
    return null
  }

  findAll() {
    return `This action returns all questions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
