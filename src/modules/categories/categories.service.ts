import { PaginationResult } from './../../shared/interfaces/pagination-result.interface';
import { BadRequestException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, QueryFailedError, Repository, UpdateResult } from 'typeorm';
import { Category } from 'src/entities/category.entity';
import { ERRORS_DICTIONARY } from 'src/constraints/error-dictionary.constraint';
import { ResponseException } from '../../exceptions/response/response.exception';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoriesRepository.create(createCategoryDto);

    return await this.categoriesRepository
      .save(newCategory)
      .then((savedCategory) => savedCategory)
      .catch((error) => {
        if (error instanceof QueryFailedError && error.message.includes('unique constraint')) {
          throw new BadRequestException(new ResponseException(ERRORS_DICTIONARY.UNIQUE_CONSTRAINT));
        }

        throw error;
      });
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    searchQueries: Record<string, any> = {}
  ): Promise<PaginationResult<Category>> {
    const whereConditions = Object.entries(searchQueries).reduce((acc, [key, value]) => {
      acc[key] = typeof value === 'string' ? Like(`%${value}%`) : value;
      return acc;
    }, {});

    const skip = (page - 1) * limit;

    return await this.categoriesRepository
      .findAndCount({
        where: whereConditions,
        withDeleted: false,
        skip: skip,
        take: limit
      })
      .then(([records, total]) => {
        const totalPages = Math.ceil(total / limit);

        return {
          records,
          total,
          page,
          limit,
          totalPages
        };
      });
  }

  async findOne(id: UUID) {
    return await this.categoriesRepository
      .findOne({ where: { id }, withDeleted: false })
      .then((categoryData) => {
        if (!categoryData) {
          throw new BadRequestException(
            new ResponseException(ERRORS_DICTIONARY.NOT_FOUND_ANY_CATEGORY, [
              `Not found any category has id=${id} in DB`
            ])
          );
        }

        return categoryData;
      });
  }

  async update(id: UUID, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    return await this.categoriesRepository
      .update(id, updateCategoryDto)
      .then(async (UpdateResult) => {
        return UpdateResult;
      })
      .catch((error) => {
        if (error instanceof QueryFailedError && error.message.includes('unique constraint')) {
          throw new BadRequestException(new ResponseException(ERRORS_DICTIONARY.UNIQUE_CONSTRAINT));
        }

        throw error;
      });
  }

  async remove(id: UUID): Promise<UpdateResult> {
    return await this.categoriesRepository
      .softDelete(id)
      .then(async (UpdateResult) => {
        return UpdateResult;
      })
      .catch((error) => {
        throw error;
      });
  }
}
