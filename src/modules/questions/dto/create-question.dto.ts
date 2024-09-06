import { Expose } from "class-transformer";
import { IsEnum, IsString } from "class-validator";
import { QuestionType } from "src/entities/enums/question-type.enum";

export class CreateQuestionDto {
  @Expose()
  @IsString()
  @IsEnum(QuestionType)
  type: string;

  @Expose()
  @IsString()
  content: string;

  @Expose()
  @IsString()
  categoryId: string;
}
