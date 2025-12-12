import { Test, TestingModule } from '@nestjs/testing';
import { ReasonController } from './reason.controller';
import { ReasonService } from './reason.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reason } from './reason.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ReasonController', () => {
  let controller: ReasonController;
  let service: ReasonService;

  const mockReasonService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReasonController],
      providers: [
        {
          provide: ReasonService,
          useValue: mockReasonService,
        },
      ],
    }).compile();

    controller = module.get<ReasonController>(ReasonController);
    service = module.get<ReasonService>(ReasonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addReason', () => {
    it('should create a reason', async () => {
      const createDto = {
        name: 'Test Reason',
        point: 10,
      };
      const expectedResult = { id: 1, ...createDto };

      mockReasonService.create.mockResolvedValue(expectedResult);

      const result = await controller.addReason(createDto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('getReasons', () => {
    it('should return an array of reasons without filters', async () => {
      const expectedResult = [{ id: 1, name: 'Test Reason', point: 10 }];

      mockReasonService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.getReasons();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return filtered reasons by name', async () => {
      const expectedResult = [{ id: 1, name: 'Test Reason', point: 10 }];

      mockReasonService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.getReasons('Test');

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith({
        name: 'Test',
        point: undefined,
      });
    });

    it('should return filtered reasons by point', async () => {
      const expectedResult = [{ id: 1, name: 'Test Reason', point: 10 }];

      mockReasonService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.getReasons(undefined, 10);

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith({
        name: undefined,
        point: 10,
      });
    });
  });

  describe('getSpecifiedReason', () => {
    it('should return a specific reason', async () => {
      const expectedResult = { id: 1, name: 'Test Reason', point: 10 };

      mockReasonService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.getSpecifiedReason(1);

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('updateReason', () => {
    it('should update a reason', async () => {
      const updateDto = {
        name: 'Updated Reason',
        point: 15,
      };
      const expectedResult = { id: 1, ...updateDto };

      mockReasonService.update.mockResolvedValue(expectedResult);

      const result = await controller.updateReason(1, updateDto);

      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('deleteReason', () => {
    it('should delete a reason', async () => {
      mockReasonService.remove.mockResolvedValue(undefined);

      await controller.deleteReason(1);

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});

describe('ReasonService', () => {
  let service: ReasonService;
  let repository: Repository<Reason>;

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
        ReasonService,
        {
          provide: getRepositoryToken(Reason),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ReasonService>(ReasonService);
    repository = module.get<Repository<Reason>>(getRepositoryToken(Reason));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a reason', async () => {
      const createData = {
        name: 'Test Reason',
        point: 10,
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

    it('should return all reasons without filters', async () => {
      const expectedResult = [{ id: 1, name: 'Test Reason', point: 10 }];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('reason');
    });

    it('should filter by name', async () => {
      const expectedResult = [{ id: 1, name: 'Test Reason', point: 10 }];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll({ name: 'Test' });

      expect(result).toEqual(expectedResult);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'reason.name LIKE :name',
        { name: '%Test%' },
      );
    });

    it('should filter by point', async () => {
      const expectedResult = [{ id: 1, name: 'Test Reason', point: 10 }];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll({ point: 10 });

      expect(result).toEqual(expectedResult);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'reason.point = :point',
        { point: 10 },
      );
    });
  });

  describe('findOne', () => {
    it('should return a reason by id', async () => {
      const expectedResult = { id: 1, name: 'Test Reason', point: 10 };

      mockRepository.findOne.mockResolvedValue(expectedResult);

      const result = await service.findOne(1);

      expect(result).toEqual(expectedResult);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if reason not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'Reason with ID 999 not found',
      );
    });
  });

  describe('update', () => {
    it('should update a reason', async () => {
      const updateData = {
        name: 'Updated Reason',
        point: 15,
      };
      const existingReason = { id: 1, name: 'Test Reason', point: 10 };
      const updatedReason = { id: 1, ...updateData };

      mockRepository.findOne
        .mockResolvedValueOnce(existingReason)
        .mockResolvedValueOnce(updatedReason);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.update(1, updateData);

      expect(result).toEqual(updatedReason);
      expect(repository.update).toHaveBeenCalledWith(1, updateData);
    });

    it('should throw NotFoundException if reason not found on update', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(
        service.update(999, {
          name: 'Updated Reason',
          point: 15,
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a reason', async () => {
      const existingReason = { id: 1, name: 'Test Reason', point: 10 };

      mockRepository.findOne.mockResolvedValue(existingReason);
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if reason not found on delete', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
