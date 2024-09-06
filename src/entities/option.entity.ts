import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Question } from './question.entity';
import { HistoryAnswer } from './history-answer.entity';

@Entity('options')
export class Option extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    length: 255
  })
  public content: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false
  })
  public isCorrect: boolean;

  @ManyToOne(() => Question, (question) => question.options)
  public question: Question;

  @OneToMany(() => HistoryAnswer, (historyAnswer) => historyAnswer.option)
  public historyAnswers: HistoryAnswer[];
}
