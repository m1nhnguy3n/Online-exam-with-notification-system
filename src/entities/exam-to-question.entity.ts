import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { UUID } from 'crypto';
import { Exam } from './exam.entity';
import { Question } from './question.entity';

@Entity('exams_questions')
export class ExamToQuestion extends BaseEntity {
  @Column({
    type: 'uuid'
  })
  public examId: string;

  @Column({
    type: 'uuid'
  })
  public questionId: string;

  @ManyToOne(() => Exam, (exam) => exam.examToQuestion)
  public exam: Exam;

  @ManyToOne(() => Question, (question) => question.examToQuestion)
  public question: Question;
}
