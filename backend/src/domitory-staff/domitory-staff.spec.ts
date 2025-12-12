import { Test, TestingModule } from '@nestjs/testing';
import { DomitoryStaffController } from './domitory-staff.controller';
import { DomitoryStaffService } from './domitory-staff.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DomitoryStaff } from './domitory-staff.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('DomitoryStaffController', () => {
  let controller: DomitoryStaffController;
  let service: DomitoryStaffService;

  const mockDomitoryStaffService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DomitoryStaffController],
      providers: [
        {
          provide: DomitoryStaffService,
          useValue: mockDomitoryStaffService,
        },
      ],
    }).compile();

    controller = module.get<DomitoryStaffController>(DomitoryStaffController);
    service = module.get<DomitoryStaffService>(DomitoryStaffService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addDomitoryStaff', () => {
    it('should create a domitory staff', async () => {
      const createDto = {
        name: 'Test Staff',
      };
      const expectedResult = { id: 1, ...createDto };

      mockDomitoryStaffService.create.mockResolvedValue(expectedResult);

      const result = await controller.addDomitoryStaff(createDto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('getDomitoryStaffs', () => {
    it('should return an array of domitory staffs without filters', async () => {
      const expectedResult = [{ id: 1, name: 'Test Staff' }];

      mockDomitoryStaffService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.getDomitoryStaffs();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return filtered domitory staffs by name', async () => {
      const expectedResult = [{ id: 1, name: 'Test Staff' }];

      mockDomitoryStaffService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.getDomitoryStaffs('Test');

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith({ name: 'Test' });
    });
  });

  describe('getSpecifiedDomitoryStaff', () => {
    it('should return a specific domitory staff', async () => {
      const expectedResult = { id: 1, name: 'Test Staff' };

      mockDomitoryStaffService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.getSpecifiedDomitoryStaff(1);

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('updateDomitoryStaff', () => {
    it('should update a domitory staff', async () => {
      const updateDto = {
        name: 'Updated Staff',
      };
      const expectedResult = { id: 1, ...updateDto };

      mockDomitoryStaffService.update.mockResolvedValue(expectedResult);

      const result = await controller.updateDomitoryStaff(1, updateDto);

      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('deleteDomitoryStaff', () => {
    it('should delete a domitory staff', async () => {
      mockDomitoryStaffService.remove.mockResolvedValue(undefined);

      await controller.deleteDomitoryStaff(1);

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});

describe('DomitoryStaffService', () => {
  let service: DomitoryStaffService;
  let repository: Repository<DomitoryStaff>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockQueryBuilder = {
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DomitoryStaffService,
        {
          provide: getRepositoryToken(DomitoryStaff),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DomitoryStaffService>(DomitoryStaffService);
    repository = module.get<Repository<DomitoryStaff>>(
      getRepositoryToken(DomitoryStaff),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a domitory staff', async () => {
      const createData = {
        name: 'Test Staff',
      };
      const expectedResult = { id: 1, ...createData };

      mockRepository.create.mockReturnValue(expectedResult);
      mockRepository.save.mockResolvedValue(expectedResult);

      const result = await service.create(createData);

      expect(result).toEqual(expectedResult);
      expect(repository.create).toHaveBeenCalledWith(createData);
      expect(repository.save).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe('findAll', () => {
    beforeEach(() => {
      mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
    });

    it('should return all domitory staffs without filters', async () => {
      const expectedResult = [{ id: 1, name: 'Test Staff' }];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('staff');
    });

    it('should filter by name', async () => {
      const expectedResult = [{ id: 1, name: 'Test Staff' }];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll({ name: 'Test' });

      expect(result).toEqual(expectedResult);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'staff.name LIKE :name',
        { name: '%Test%' },
      );
    });
  });

  describe('findOne', () => {
    it('should return a domitory staff by id', async () => {
      const expectedResult = { id: 1, name: 'Test Staff' };

      mockRepository.findOne.mockResolvedValue(expectedResult);

      const result = await service.findOne(1);

      expect(result).toEqual(expectedResult);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if domitory staff not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'DomitoryStaff with ID 999 not found',
      );
    });
  });

  describe('update', () => {
    it('should update a domitory staff', async () => {
      const updateData = {
        name: 'Updated Staff',
      };
      const existingStaff = { id: 1, name: 'Test Staff' };
      const updatedStaff = { id: 1, ...updateData };

      mockRepository.findOne
        .mockResolvedValueOnce(existingStaff)
        .mockResolvedValueOnce(updatedStaff);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.update(1, updateData);

      expect(result).toEqual(updatedStaff);
      expect(repository.update).toHaveBeenCalledWith(1, updateData);
    });

    it('should throw NotFoundException if domitory staff not found on update', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(
        service.update(999, {
          name: 'Updated Staff',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a domitory staff', async () => {
      const existingStaff = { id: 1, name: 'Test Staff' };

      mockRepository.findOne.mockResolvedValue(existingStaff);
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if domitory staff not found on delete', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
