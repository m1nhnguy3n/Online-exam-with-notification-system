import { BadRequestException, ForbiddenException, Injectable, NotAcceptableException } from '@nestjs/common';
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
import { Paginate } from './dto/paginate.dto';

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

  async getAllQuestions(user:any, dto: Paginate){
    const limit=dto.limit
    const offset=(dto.page-1)*limit
    const query = this.questionRepository
      .createQueryBuilder('question')
      .limit(limit)
      .offset(offset);
      
    
    if (!user) {
      throw new ForbiddenException({})
    }
    if (user.role === "teacher") {
      const { id } = await this.userService.findOneTeacherByUserId(user.id)
      return query
        .innerJoinAndSelect('question.teacher', 'teacher')
        .select(['question.type', 'question.content'])
        .where('teacher.id = :teacherId', { teacherId: id })
        .getMany(); 
    }
    const questions = await query.getMany();
    return questions;
  }

  async findOne(questionId: UUID) {
    return await this.questionRepository.findOne({
      where: {
        id:questionId
      }
    })
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  async remove(questionId: UUID) {
    const foundQuestion = await this.findOne(questionId);
    if (!foundQuestion) {
      throw new BadRequestException({
        message:ERRORS_DICTIONARY.QUESTION_NOT_FOUND
      })
    }
    const obj =await this.questionRepository.softDelete(questionId)
    return obj;
  }
}
