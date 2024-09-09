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
  UseFilters,
  HttpCode
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UUID } from 'crypto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/shared/exceptions/http-exception.filter';

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
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const data = await this.categoriesService.create(createCategoryDto);

      return {
        success: true,
        data,
        message: 'Created'
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Found resources'
  })
  @Get()
  async findAll() {
    try {
      const data = await this.categoriesService.findAll();

      return {
        success: true,
        data,
        message: 'Successfully'
      };
    } catch (error) {
      throw error;
    }
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
    try {
      const data = await this.categoriesService.findOne(id);

      return {
        success: true,
        data,
        message: 'Successfully'
      };
    } catch (error) {
      throw error;
    }
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
    try {
      const numResourcesEffected = await this.categoriesService.update(id, updateCategoryDto);

      return {
        success: true,
        numResourcesEffected,
        message: 'Successfully'
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
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
  async remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      const numResourcesEffected = await this.categoriesService.remove(id);

      return {
        success: true,
        numResourcesEffected,
        message: 'Successfully'
      };
    } catch (error) {
      throw error;
    }
  }
}
