import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateCategoryDto } from './create-category.dto';

export class QueryCategoryDto extends CreateCategoryDto {
  @ApiProperty({ required: false, default: 1 })
  @IsNumber()
  @Type(() => Number)
  readonly page: number;

  @ApiProperty({ required: false, default: 10 })
  @IsNumber()
  @Type(() => Number)
  readonly limit: number;

  @IsString()
  @ApiProperty({ required: false, default: '' })
  readonly name: string = '';
}
