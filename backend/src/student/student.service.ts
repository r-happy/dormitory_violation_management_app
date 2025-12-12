import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async create(data: {
    name: string;
    sexId: number;
    classId: number;
    roomNumber: number;
    roleId: number;
  }): Promise<Student> {
    const student = this.studentRepository.create(data);
    return this.studentRepository.save(student);
  }

  async findAll(filters?: {
    name?: string;
    sexId?: number;
    classId?: number;
    roomNumber?: number;
    point?: number;
  }): Promise<Student[]> {
    const query = this.studentRepository.createQueryBuilder('student');

    if (filters?.name) {
      query.andWhere('student.name LIKE :name', { name: `%${filters.name}%` });
    }
    if (filters?.sexId) {
      query.andWhere('student.sexId = :sexId', { sexId: filters.sexId });
    }
    if (filters?.classId) {
      query.andWhere('student.classId = :classId', {
        classId: filters.classId,
      });
    }
    if (filters?.roomNumber) {
      query.andWhere('student.roomNumber = :roomNumber', {
        roomNumber: filters.roomNumber,
      });
    }
    if (filters?.point !== undefined) {
      query
        .leftJoinAndSelect('student.violations', 'violation')
        .groupBy('student.id')
        .having('SUM(violation.point) = :point', { point: filters.point });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(
    id: number,
    data: {
      name: string;
      sexId: number;
      classId: number;
      roomNumber: number;
      roleId: number;
    },
  ): Promise<Student> {
    await this.findOne(id);
    await this.studentRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.studentRepository.delete(id);
  }
}
