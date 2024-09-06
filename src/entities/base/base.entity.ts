import { UUID } from 'crypto';
import { BeforeInsert, CreateDateColumn, DeleteDateColumn, Column, UpdateDateColumn, Index } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

export abstract class BaseEntity {
  @Index({ unique: true })
  @Column('uuid', {
    primary: true,
    name: 'ID'
  })
  public id: UUID;

  @UpdateDateColumn()
  public updatedAt: Date;

  @CreateDateColumn()
  public createdAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
