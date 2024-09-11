import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, UseInterceptors } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { UUID } from 'crypto';
import { ApiTags } from '@nestjs/swagger';
import { Paginate } from './dto/paginate.dto';
import { FindOneQuestionDTO } from './dto/find-one-question.dto';
import { TransformInterceptor } from 'src/interceptors/transform-responce.interceptor';



@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async create(@Request() req, @Body() createQuestionDto: CreateQuestionDto) {
    const userId: UUID = req.user;
    return await this.questionsService.create(userId,createQuestionDto)
    // const teacherId: UUID = req.user;
    // return await this.questionsService.create('66da722a-6528-800b-98e3-6be4a2cebe04', createQuestionDto);
  }

  @Get(':id')
  async findOne(@Param('id') dto: FindOneQuestionDTO) {
    return await this.questionsService.findOne(dto.questionId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  async remove(@Param('id') dto: FindOneQuestionDTO) {
    return await this.questionsService.remove(dto.questionId);
  }

  @Get('')
  @UseInterceptors(TransformInterceptor)
  async getAllQuestion(@Request() req, @Query() dto: Paginate) {
    const user = req.user;
    
    // const data = await this.questionsService.getAllQuestions(
    //   {
    //     userId: '66d913ff-4a80-800b-8cab-0cdb8b81023a',
    //     role: 'admin'
    //   },
    //   dto
    // );
    const data = await this.questionsService.getAllQuestions(user, dto);
    return data
  }
}
