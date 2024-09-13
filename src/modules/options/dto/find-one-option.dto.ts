import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class FindOneOptionDTO {
  @IsUUID(4)
  optionId: UUID;
}
