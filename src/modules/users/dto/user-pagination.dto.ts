import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UserPaginationDto {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly firstName?: string = '';

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly lastName?: string = '';

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
