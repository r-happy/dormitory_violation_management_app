import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reason } from './reason.entity';

@Injectable()
export class ReasonService {
  constructor(
    @InjectRepository(Reason)
    private reasonRepository: Repository<Reason>,
  ) {}

  async create(data: { name: string; point: number }): Promise<Reason> {
    const reason = this.reasonRepository.create(data);
    return this.reasonRepository.save(reason);
  }

  async findAll(filters?: {
    name?: string;
    point?: number;
  }): Promise<Reason[]> {
    const query = this.reasonRepository.createQueryBuilder('reason');

    if (filters?.name) {
      query.andWhere('reason.name LIKE :name', { name: `%${filters.name}%` });
    }
    if (filters?.point !== undefined) {
      query.andWhere('reason.point = :point', { point: filters.point });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Reason> {
    const reason = await this.reasonRepository.findOne({ where: { id } });
    if (!reason) {
      throw new NotFoundException(`Reason with ID ${id} not found`);
    }
    return reason;
  }

  async update(
    id: number,
    data: { name: string; point: number },
  ): Promise<Reason> {
    await this.findOne(id);
    await this.reasonRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.reasonRepository.delete(id);
  }
}
