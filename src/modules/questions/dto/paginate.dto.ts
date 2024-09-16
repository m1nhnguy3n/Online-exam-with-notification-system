import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class Paginate {
  @ApiProperty({
    description: 'LIMIT',
    example: '5'
  })
  @IsOptional()
  @Type(() => Number)
  limit: number = 5;

  @ApiProperty({
    description: 'Page',
    example: '1'
  })
  @IsOptional()
  @Type(() => Number)
  page: number = 1;
}
