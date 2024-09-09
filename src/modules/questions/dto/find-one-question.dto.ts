import { IsUUID } from "class-validator";
import { UUID } from "crypto";

export class FindOneQuestionDTO{
    @IsUUID(4)
    questionId:UUID
}