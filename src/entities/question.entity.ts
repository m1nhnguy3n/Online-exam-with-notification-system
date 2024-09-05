import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Teacher } from './teacher.entity';
import { Option } from './option.entity';
import { Category } from './category.entity';
import { ExamToQuestion } from './exam-to-question.entity';

export enum QuestionType {
  MULTIPLE_CHOICES = 'M',
  SINGLE_CHOICE = 'S'
}

@Entity('questions')
export class Question extends BaseEntity {
  @Column({
    type: 'enum',
    enum: QuestionType,
    default: QuestionType.SINGLE_CHOICE
  })
  public type: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255
  })
  public content: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.questions)
  @JoinColumn({ name: 'teacherId' })
  public teacher: Teacher;

  @OneToMany(() => Option, (option) => option.question)
  public options: Option[];

  @ManyToOne(() => Category, (category) => category.questions)
  @JoinColumn({ name: 'categoryId' })
  public category: Category;

  @OneToMany(() => ExamToQuestion, (examToQuestion) => examToQuestion.question)
  examToQuestion: ExamToQuestion[];
}
