import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  UseFilters
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UUID } from 'crypto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';

@ApiTags('categories')
@Controller('categories')
@UseFilters(HttpExceptionFilter)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created'
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: 'Unique fields'
  })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const data = await this.categoriesService.create(createCategoryDto);

      return {
        success: true,
        data,
        message: 'Category created'
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      const data = await this.categoriesService.findAll();

      return {
        success: true,
        data,
        message: 'User Fetched Successfully'
      };
    } catch (error) {
      return new HttpException(
        {
          response: {
            success: false,
            message: error.message
          }
        },
        HttpStatus.NOT_ACCEPTABLE
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      const data = this.categoriesService.findOne(id);

      return {
        success: true,
        data,
        message: 'User Fetched Successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  @Patch(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: UUID, @Body() updateCategoryDto: UpdateCategoryDto) {
    try {
      const data = this.categoriesService.update(id, updateCategoryDto);
    } catch (error) {}
  }

  @Delete(':id')
  async remove(@Param('id') id: UUID) {
    return this.categoriesService.remove(id);
  }
}
