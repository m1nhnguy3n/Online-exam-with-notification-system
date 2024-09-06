import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { UUID } from 'crypto';
import { Result } from './result.entity';
import { Option } from './option.entity';

@Entity('history_answers')
export class HistoryAnswer extends BaseEntity {
  @Column({
    type: 'uuid'
  })
  public resultId: string;

  @Column({
    type: 'uuid'
  })
  public optionId: string;

  @ManyToOne(() => Result, (result) => result.historyAnswers)
  public result: Result;

  @ManyToOne(() => Option, (option) => option.historyAnswers)
  public option: Option;
}
