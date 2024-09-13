import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { User } from 'src/entities/user.entity';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { UpdateResult } from 'typeorm';
import { UserPaginationDto } from '../users/dto/user-pagination.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeachersService } from './teachers.service';

@Controller('teacher')
@ApiTags('Teacher')
@UseInterceptors(LoggingInterceptor)
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @ApiCreatedResponse({ description: 'The teacher has been successfully created.' })
  async create(@Body() createTeacherDto: CreateTeacherDto): Promise<User> {
    return await this.teachersService.create(createTeacherDto, createTeacherDto.subject);
  }

  @Get()
  @ApiOkResponse({ description: 'Get all teachers successfully' })
  async findAll(@Query() userPagination: UserPaginationDto) {
    return await this.teachersService.findAll(userPagination);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get teacher by id successfully' })
  async findOne(@Param('id', ParseUUIDPipe) id: UUID): Promise<User> {
    return await this.teachersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'The teacher has been successfully updated.' })
  async update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateTeacherDto: UpdateTeacherDto
  ): Promise<UpdateResult> {
    return await this.teachersService.update(id, updateTeacherDto, updateTeacherDto.subject);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted teacher successfully' })
  async remove(@Param('id', ParseUUIDPipe) id: UUID): Promise<UpdateResult> {
    return await this.teachersService.remove(id);
  }
}
