import { Test, TestingModule } from '@nestjs/testing';
import { ClassTeacherController } from './class-teacher.controller';
import { ClassTeacherService } from './class-teacher.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClassTeacher } from './class-teacher.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ClassTeacherController', () => {
  let controller: ClassTeacherController;
  let service: ClassTeacherService;

  const mockClassTeacherService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassTeacherController],
      providers: [
        {
          provide: ClassTeacherService,
          useValue: mockClassTeacherService,
        },
      ],
    }).compile();

    controller = module.get<ClassTeacherController>(ClassTeacherController);
    service = module.get<ClassTeacherService>(ClassTeacherService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addClassTeacher', () => {
    it('should create a class teacher', async () => {
      const createDto = {
        name: 'Test Teacher',
        classId: 1,
      };
      const expectedResult = { id: 1, ...createDto };

      mockClassTeacherService.create.mockResolvedValue(expectedResult);

      const result = await controller.addClassTeacher(createDto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('getClassTeachers', () => {
    it('should return an array of class teachers without filters', async () => {
      const expectedResult = [{ id: 1, name: 'Test Teacher', classId: 1 }];

      mockClassTeacherService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.getClassTeachers();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return filtered class teachers by name', async () => {
      const expectedResult = [{ id: 1, name: 'Test Teacher', classId: 1 }];

      mockClassTeacherService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.getClassTeachers('Test');

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith({
        name: 'Test',
        classId: undefined,
      });
    });

    it('should return filtered class teachers by classId', async () => {
      const expectedResult = [{ id: 1, name: 'Test Teacher', classId: 1 }];

      mockClassTeacherService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.getClassTeachers(undefined, 1);

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith({
        name: undefined,
        classId: 1,
      });
    });
  });

  describe('getSpecifiedClassTeacher', () => {
    it('should return a specific class teacher', async () => {
      const expectedResult = { id: 1, name: 'Test Teacher', classId: 1 };

      mockClassTeacherService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.getSpecifiedClassTeacher(1);

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('updateClassTeacher', () => {
    it('should update a class teacher', async () => {
      const updateDto = {
        name: 'Updated Teacher',
        classId: 2,
      };
      const expectedResult = { id: 1, ...updateDto };

      mockClassTeacherService.update.mockResolvedValue(expectedResult);

      const result = await controller.updateClassTeacher(1, updateDto);

      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('deleteClassTeacher', () => {
    it('should delete a class teacher', async () => {
      mockClassTeacherService.remove.mockResolvedValue(undefined);

      await controller.deleteClassTeacher(1);

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});

describe('ClassTeacherService', () => {
  let service: ClassTeacherService;
  let repository: Repository<ClassTeacher>;

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
        ClassTeacherService,
        {
          provide: getRepositoryToken(ClassTeacher),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClassTeacherService>(ClassTeacherService);
    repository = module.get<Repository<ClassTeacher>>(
      getRepositoryToken(ClassTeacher),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a class teacher', async () => {
      const createData = {
        name: 'Test Teacher',
        classId: 1,
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

    it('should return all class teachers without filters', async () => {
      const expectedResult = [{ id: 1, name: 'Test Teacher', classId: 1 }];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('teacher');
    });

    it('should filter by name', async () => {
      const expectedResult = [{ id: 1, name: 'Test Teacher', classId: 1 }];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll({ name: 'Test' });

      expect(result).toEqual(expectedResult);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'teacher.name LIKE :name',
        { name: '%Test%' },
      );
    });

    it('should filter by classId', async () => {
      const expectedResult = [{ id: 1, name: 'Test Teacher', classId: 1 }];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll({ classId: 1 });

      expect(result).toEqual(expectedResult);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'teacher.classId = :classId',
        { classId: 1 },
      );
    });
  });

  describe('findOne', () => {
    it('should return a class teacher by id', async () => {
      const expectedResult = { id: 1, name: 'Test Teacher', classId: 1 };

      mockRepository.findOne.mockResolvedValue(expectedResult);

      const result = await service.findOne(1);

      expect(result).toEqual(expectedResult);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if class teacher not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'ClassTeacher with ID 999 not found',
      );
    });
  });

  describe('update', () => {
    it('should update a class teacher', async () => {
      const updateData = {
        name: 'Updated Teacher',
        classId: 2,
      };
      const existingTeacher = { id: 1, name: 'Test Teacher', classId: 1 };
      const updatedTeacher = { id: 1, ...updateData };

      mockRepository.findOne
        .mockResolvedValueOnce(existingTeacher)
        .mockResolvedValueOnce(updatedTeacher);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.update(1, updateData);

      expect(result).toEqual(updatedTeacher);
      expect(repository.update).toHaveBeenCalledWith(1, updateData);
    });

    it('should throw NotFoundException if class teacher not found on update', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(
        service.update(999, {
          name: 'Updated Teacher',
          classId: 2,
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a class teacher', async () => {
      const existingTeacher = { id: 1, name: 'Test Teacher', classId: 1 };

      mockRepository.findOne.mockResolvedValue(existingTeacher);
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if class teacher not found on delete', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
