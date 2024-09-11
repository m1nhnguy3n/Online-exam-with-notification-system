import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UUID } from 'crypto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryCategoryDto } from './dto/query-category.dto';
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiCreatedResponse({ description: 'Created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @ApiOkResponse({ description: 'Found resources' })
  @Get()
  async findAll(@Query() queryCategoryDto: QueryCategoryDto) {
    const { page, limit, ...searchQueries } = queryCategoryDto;

    return await this.categoriesService.findAll(page, limit, searchQueries);
  }

  @ApiOkResponse({ description: 'Found resource' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return await this.categoriesService.findOne(id);
  }

  @ApiOkResponse({ description: 'Updated' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Patch(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: UUID, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesService.update(id, updateCategoryDto);
  }

  @ApiOkResponse({ description: 'Deleted' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return await this.categoriesService.remove(id);
  }
}
