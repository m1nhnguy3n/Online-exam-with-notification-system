import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { UUID } from 'crypto';
import { QuestionType } from 'src/entities/enums/question-type.enum';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'type of question',
    example: 'S'
  })
  @Expose()
  @IsString()
  @IsEnum(QuestionType)
  type: string;

  @ApiProperty({
    description: 'content of question',
    example: 'cong thuc abc la:'
  })
  @Expose()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'category of quesiton',
    example: '42d620b8-f905-4db9-b2ce-fed900f0cf63'
  })
  @Expose()
  @IsString()
  categoryId: UUID;
}
