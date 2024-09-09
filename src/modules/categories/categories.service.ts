import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/category.entity';
import { ERRORS_DICTIONARY } from 'src/constraints/error-dictionary.constraint';
import { ResponseException } from 'src/shared/exceptions/response.exception';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    // Find a record which existing name
    const existingCategory = await this.categoriesRepository.findOne({
      where: { name: createCategoryDto.name },
      withDeleted: true
    });

    if (existingCategory) {
      throw new HttpException(
        new ResponseException(ERRORS_DICTIONARY.EXISTING_A_RECORD, [
          `Existing a record with name=${createCategoryDto.name} in DB`
        ]),
        HttpStatus.NOT_ACCEPTABLE
      );
    }

    const newCategory = await this.categoriesRepository.create(createCategoryDto);

    const newRecord = await this.categoriesRepository.save(newCategory);

    return newRecord;
  }

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find({ withDeleted: false });
  }

  async findOne(id: UUID) {
    const categoryData = await this.categoriesRepository.findOne({ where: { id }, withDeleted: false });

    if (!categoryData) {
      throw new HttpException(
        new ResponseException(ERRORS_DICTIONARY.NOT_FOUND_ANY_CATEGORY, [
          `Not found any category has id=${id} in DB`
        ]),
        HttpStatus.NOT_FOUND
      );
    }

    return categoryData;
  }

  async update(id: UUID, updateCategoryDto: UpdateCategoryDto) {
    return await this.findOne(id)
      .then(async () => {
        const updateResult = await this.categoriesRepository.update(id, updateCategoryDto);

        return updateResult.affected;
      })
      .catch((error) => {
        throw error;
      });
  }

  async remove(id: UUID) {
    return await this.findOne(id)
      .then(async () => {
        const updateResult = await this.categoriesRepository.softDelete(id);

        return updateResult.affected;
      })
      .catch((error) => {
        throw error;
      });
  }
}
