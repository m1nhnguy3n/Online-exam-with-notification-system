import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateCategoryDto } from './create-category.dto';

export class QueryCategoryDto extends CreateCategoryDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @Type(() => Number)
  readonly page: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @Type(() => Number)
  readonly limit: number;
}
