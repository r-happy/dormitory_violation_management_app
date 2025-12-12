import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DomitoryStaff } from './domitory-staff.entity';

@Injectable()
export class DomitoryStaffService {
  constructor(
    @InjectRepository(DomitoryStaff)
    private domitoryStaffRepository: Repository<DomitoryStaff>,
  ) {}

  async create(data: { name: string }): Promise<DomitoryStaff> {
    const staff = this.domitoryStaffRepository.create(data);
    return this.domitoryStaffRepository.save(staff);
  }

  async findAll(filters?: { name?: string }): Promise<DomitoryStaff[]> {
    const query = this.domitoryStaffRepository.createQueryBuilder('staff');

    if (filters?.name) {
      query.andWhere('staff.name LIKE :name', { name: `%${filters.name}%` });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<DomitoryStaff> {
    const staff = await this.domitoryStaffRepository.findOne({ where: { id } });
    if (!staff) {
      throw new NotFoundException(`DomitoryStaff with ID ${id} not found`);
    }
    return staff;
  }

  async update(id: number, data: { name: string }): Promise<DomitoryStaff> {
    await this.findOne(id);
    await this.domitoryStaffRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.domitoryStaffRepository.delete(id);
  }
}
