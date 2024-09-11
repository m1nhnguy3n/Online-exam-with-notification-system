import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { UUID } from 'crypto';
import { Exam } from './exam.entity';
import { Question } from './question.entity';

@Entity('exams_questions')
export class ExamQuestion extends BaseEntity {
  @Column({
    type: 'uuid'
  })
  public examId: UUID;

  @Column({
    type: 'uuid'
  })
  public questionId: UUID;

  @Column({
    type: 'integer',
    nullable: false
  })
  public order: number;

  @ManyToOne(() => Exam, (exam) => exam.examQuestion)
  public exam: Exam;

  @ManyToOne(() => Question, (question) => question.examQuestion)
  public question: Question;
}
