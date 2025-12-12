import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassTeacher } from './class-teacher.entity';

@Injectable()
export class ClassTeacherService {
  constructor(
    @InjectRepository(ClassTeacher)
    private classTeacherRepository: Repository<ClassTeacher>,
  ) {}

  async create(data: { name: string; classId: number }): Promise<ClassTeacher> {
    const teacher = this.classTeacherRepository.create(data);
    return this.classTeacherRepository.save(teacher);
  }

  async findAll(filters?: {
    name?: string;
    classId?: number;
  }): Promise<ClassTeacher[]> {
    const query = this.classTeacherRepository.createQueryBuilder('teacher');

    if (filters?.name) {
      query.andWhere('teacher.name LIKE :name', { name: `%${filters.name}%` });
    }
    if (filters?.classId) {
      query.andWhere('teacher.classId = :classId', {
        classId: filters.classId,
      });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<ClassTeacher> {
    const teacher = await this.classTeacherRepository.findOne({
      where: { id },
    });
    if (!teacher) {
      throw new NotFoundException(`ClassTeacher with ID ${id} not found`);
    }
    return teacher;
  }

  async update(
    id: number,
    data: { name: string; classId: number },
  ): Promise<ClassTeacher> {
    await this.findOne(id);
    await this.classTeacherRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.classTeacherRepository.delete(id);
  }
}
