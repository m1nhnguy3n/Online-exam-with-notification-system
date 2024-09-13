import { Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import { UUID } from 'crypto';
export class CreateOptionDto {
  @Expose()
  @IsString()
  content: string;

  @Expose()
  @IsBoolean()
  isCorrect: boolean;

  @Expose()
  @IsString()
  questionId: UUID;
}
