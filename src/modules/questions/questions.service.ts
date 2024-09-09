import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from 'src/entities/question.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { Category } from 'src/entities/category.entity';
import { UserService } from '../user/user.service';
import { UUID } from 'crypto';
import { ERRORS_DICTIONARY } from 'src/constraints/error-dictionary.constraint';

@Injectable()
export class QuestionsService {
  constructor(@InjectRepository(Question) private questionRepository: Repository<Question>, private userService: UserService) { }
  
  async create(teacherId: UUID, createQuestionDto: CreateQuestionDto): Promise<Question> {
    const { categoryId, content, type } = createQuestionDto;
    const question = this.questionRepository.create({
      content: content,
      type: type,
      category: {
        id: categoryId
      },
      teacher: {
        id: teacherId
      }
    });

    const newQuestion = await this.questionRepository.save(question)
    if (!newQuestion) {
      throw new BadRequestException({
        message: ERRORS_DICTIONARY.CREATE_QUESTION_FAIL
      });
    }
    return newQuestion;
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
