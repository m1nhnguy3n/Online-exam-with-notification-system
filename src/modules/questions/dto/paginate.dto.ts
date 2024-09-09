import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class Paginate {
  @IsOptional()
  @Type(() => Number)
  limit: number=5;

  @IsOptional()
  @Type(() => Number)
  page: number=1;
  
  
  
}