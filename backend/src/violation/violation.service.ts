import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Violation } from './violation.entity';

@Injectable()
export class ViolationService {
  constructor(
    @InjectRepository(Violation)
    private violationRepository: Repository<Violation>,
  ) {}

  async create(data: {
    point: number;
    reasonId: number;
    userId: number;
    date: string;
  }): Promise<Violation> {
    const violation = this.violationRepository.create(data);
    return this.violationRepository.save(violation);
  }

  async findAll(filters?: {
    point?: number;
    reasonId?: number;
    userId?: number;
    fromDate?: string;
    toDate?: string;
  }): Promise<Violation[]> {
    const query = this.violationRepository.createQueryBuilder('violation');

    if (filters?.point !== undefined) {
      query.andWhere('violation.point = :point', { point: filters.point });
    }
    if (filters?.reasonId) {
      query.andWhere('violation.reasonId = :reasonId', {
        reasonId: filters.reasonId,
      });
    }
    if (filters?.userId) {
      query.andWhere('violation.userId = :userId', { userId: filters.userId });
    }
    if (filters?.fromDate && filters?.toDate) {
      query.andWhere('violation.date BETWEEN :fromDate AND :toDate', {
        fromDate: filters.fromDate,
        toDate: filters.toDate,
      });
    } else if (filters?.fromDate) {
      query.andWhere('violation.date >= :fromDate', {
        fromDate: filters.fromDate,
      });
    } else if (filters?.toDate) {
      query.andWhere('violation.date <= :toDate', { toDate: filters.toDate });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Violation> {
    const violation = await this.violationRepository.findOne({ where: { id } });
    if (!violation) {
      throw new NotFoundException(`Violation with ID ${id} not found`);
    }
    return violation;
  }

  async update(
    id: number,
    data: {
      point: number;
      reasonId: number;
      userId: number;
      date: string;
    },
  ): Promise<Violation> {
    await this.findOne(id);
    await this.violationRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.violationRepository.delete(id);
  }
}
