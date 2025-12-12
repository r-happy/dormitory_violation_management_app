import { Test, TestingModule } from '@nestjs/testing';
import { ViolationController } from './violation.controller';
import { ViolationService } from './violation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Violation } from './violation.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ViolationController', () => {
  let controller: ViolationController;
  let service: ViolationService;

  const mockViolationService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViolationController],
      providers: [
        {
          provide: ViolationService,
          useValue: mockViolationService,
        },
      ],
    }).compile();

    controller = module.get<ViolationController>(ViolationController);
    service = module.get<ViolationService>(ViolationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addViolation', () => {
    it('should create a violation', async () => {
      const createDto = {
        point: 10,
        reasonId: 1,
        userId: 1,
        date: '2025-12-12',
      };
      const expectedResult = { id: 1, ...createDto };

      mockViolationService.create.mockResolvedValue(expectedResult);

      const result = await controller.addViolation(createDto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('getViolations', () => {
    it('should return an array of violations without filters', async () => {
      const expectedResult = [
        { id: 1, point: 10, reasonId: 1, userId: 1, date: '2025-12-12' },
      ];

      mockViolationService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.getViolations();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return filtered violations by point', async () => {
      const expectedResult = [
        { id: 1, point: 10, reasonId: 1, userId: 1, date: '2025-12-12' },
      ];

      mockViolationService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.getViolations(10);

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith({
        point: 10,
        reasonId: undefined,
        userId: undefined,
        fromDate: undefined,
        toDate: undefined,
      });
    });

    it('should return filtered violations by date range', async () => {
      const expectedResult = [
        { id: 1, point: 10, reasonId: 1, userId: 1, date: '2025-12-12' },
      ];

      mockViolationService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.getViolations(
        undefined,
        undefined,
        undefined,
        '2025-12-01',
        '2025-12-31',
      );

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith({
        point: undefined,
        reasonId: undefined,
        userId: undefined,
        fromDate: '2025-12-01',
        toDate: '2025-12-31',
      });
    });
  });

  describe('getSpecifiedViolation', () => {
    it('should return a specific violation', async () => {
      const expectedResult = {
        id: 1,
        point: 10,
        reasonId: 1,
        userId: 1,
        date: '2025-12-12',
      };

      mockViolationService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.getSpecifiedViolation(1, {});

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('updateViolation', () => {
    it('should update a violation', async () => {
      const updateDto = {
        point: 15,
        reasonId: 2,
        userId: 1,
        date: '2025-12-13',
      };
      const expectedResult = { id: 1, ...updateDto };

      mockViolationService.update.mockResolvedValue(expectedResult);

      const result = await controller.updateViolation(1, updateDto);

      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('deleteViolation', () => {
    it('should delete a violation', async () => {
      mockViolationService.remove.mockResolvedValue(undefined);

      await controller.deleteViolation(1);

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});

describe('ViolationService', () => {
  let service: ViolationService;
  let repository: Repository<Violation>;

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
        ViolationService,
        {
          provide: getRepositoryToken(Violation),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ViolationService>(ViolationService);
    repository = module.get<Repository<Violation>>(
      getRepositoryToken(Violation),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a violation', async () => {
      const createData = {
        point: 10,
        reasonId: 1,
        userId: 1,
        date: '2025-12-12',
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

    it('should return all violations without filters', async () => {
      const expectedResult = [
        { id: 1, point: 10, reasonId: 1, userId: 1, date: '2025-12-12' },
      ];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('violation');
    });

    it('should filter by point', async () => {
      const expectedResult = [
        { id: 1, point: 10, reasonId: 1, userId: 1, date: '2025-12-12' },
      ];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll({ point: 10 });

      expect(result).toEqual(expectedResult);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'violation.point = :point',
        { point: 10 },
      );
    });

    it('should filter by reasonId', async () => {
      const expectedResult = [
        { id: 1, point: 10, reasonId: 1, userId: 1, date: '2025-12-12' },
      ];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll({ reasonId: 1 });

      expect(result).toEqual(expectedResult);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'violation.reasonId = :reasonId',
        { reasonId: 1 },
      );
    });

    it('should filter by userId', async () => {
      const expectedResult = [
        { id: 1, point: 10, reasonId: 1, userId: 1, date: '2025-12-12' },
      ];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll({ userId: 1 });

      expect(result).toEqual(expectedResult);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'violation.userId = :userId',
        { userId: 1 },
      );
    });

    it('should filter by date range', async () => {
      const expectedResult = [
        { id: 1, point: 10, reasonId: 1, userId: 1, date: '2025-12-12' },
      ];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll({
        fromDate: '2025-12-01',
        toDate: '2025-12-31',
      });

      expect(result).toEqual(expectedResult);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'violation.date BETWEEN :fromDate AND :toDate',
        { fromDate: '2025-12-01', toDate: '2025-12-31' },
      );
    });

    it('should filter by fromDate only', async () => {
      const expectedResult = [
        { id: 1, point: 10, reasonId: 1, userId: 1, date: '2025-12-12' },
      ];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll({ fromDate: '2025-12-01' });

      expect(result).toEqual(expectedResult);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'violation.date >= :fromDate',
        { fromDate: '2025-12-01' },
      );
    });

    it('should filter by toDate only', async () => {
      const expectedResult = [
        { id: 1, point: 10, reasonId: 1, userId: 1, date: '2025-12-12' },
      ];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll({ toDate: '2025-12-31' });

      expect(result).toEqual(expectedResult);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'violation.date <= :toDate',
        { toDate: '2025-12-31' },
      );
    });
  });

  describe('findOne', () => {
    it('should return a violation by id', async () => {
      const expectedResult = {
        id: 1,
        point: 10,
        reasonId: 1,
        userId: 1,
        date: '2025-12-12',
      };

      mockRepository.findOne.mockResolvedValue(expectedResult);

      const result = await service.findOne(1);

      expect(result).toEqual(expectedResult);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if violation not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'Violation with ID 999 not found',
      );
    });
  });

  describe('update', () => {
    it('should update a violation', async () => {
      const updateData = {
        point: 15,
        reasonId: 2,
        userId: 1,
        date: '2025-12-13',
      };
      const existingViolation = {
        id: 1,
        point: 10,
        reasonId: 1,
        userId: 1,
        date: '2025-12-12',
      };
      const updatedViolation = { id: 1, ...updateData };

      mockRepository.findOne
        .mockResolvedValueOnce(existingViolation)
        .mockResolvedValueOnce(updatedViolation);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.update(1, updateData);

      expect(result).toEqual(updatedViolation);
      expect(repository.update).toHaveBeenCalledWith(1, updateData);
    });

    it('should throw NotFoundException if violation not found on update', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(
        service.update(999, {
          point: 15,
          reasonId: 2,
          userId: 1,
          date: '2025-12-13',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a violation', async () => {
      const existingViolation = {
        id: 1,
        point: 10,
        reasonId: 1,
        userId: 1,
        date: '2025-12-12',
      };

      mockRepository.findOne.mockResolvedValue(existingViolation);
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if violation not found on delete', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
