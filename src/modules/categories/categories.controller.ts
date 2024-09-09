import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  UseFilters,
  Req,
  Query
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UUID } from 'crypto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/shared/exceptions/http-exception.filter';
import { query, Request } from 'express';
import { QueryCategoryDto } from './dto/query-category.dto';
@ApiTags('categories')
@Controller('categories')
@UseFilters(HttpExceptionFilter)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created'
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: 'Unique fields'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const data = await this.categoriesService.create(createCategoryDto);

    return {
      success: true,
      data,
      message: 'Created'
    };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Found resources'
  })
  @Get()
  async findAll(@Query() queryCategoryDto: QueryCategoryDto) {
    const { page, limit, ...searchQueries } = queryCategoryDto;
    console.log({ page, limit, ...searchQueries });
    const data = await this.categoriesService.findAll(page, limit, searchQueries);

    return {
      success: true,
      data,
      message: 'Success'
    };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Found resource'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation Failed'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found any resource'
  })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: UUID) {
    const data = await this.categoriesService.findOne(id);

    return {
      success: true,
      data,
      message: 'Success'
    };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation Failed'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found any resource'
  })
  @Patch(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: UUID, @Body() updateCategoryDto: UpdateCategoryDto) {
    const numResourcesAffected = await this.categoriesService.update(id, updateCategoryDto);

    return {
      success: true,
      data: { numResourcesAffected },
      message: 'Success'
    };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Deleted'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation Failed'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found any resource'
  })
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    const numResourcesAffected = await this.categoriesService.remove(id);

    return {
      success: true,
      data: { numResourcesAffected },
      message: 'Success'
    };
  }
}
