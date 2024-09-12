import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/entities/teacher.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TeachersRepository {
  constructor(@InjectRepository(Teacher) private readonly teachersRepository: Repository<Teacher>) {}

  async create(userData, subject): Promise<Teacher> {
    const teacherData = await this.teachersRepository.create({
      user: userData,
      subject
    });

    return await this.teachersRepository.save(teacherData);
  }
  
  async update(teacherId, subject): Promise<UpdateResult> {
    return this.teachersRepository.update(teacherId, { subject });
  }

  async delete(userId): Promise<UpdateResult> {
    return await this.teachersRepository.softDelete({ user: { id: userId } });
  }
}
