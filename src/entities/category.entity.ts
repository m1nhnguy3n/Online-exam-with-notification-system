import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Question } from './question.entity';
import { Exam } from './exam.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false
  })
  public name: string;

  @OneToMany(() => Question, (question) => question.category)
  public questions: Question[];

  @OneToMany(() => Exam, (exam) => exam.category)
  public exams: Exam[];
}
