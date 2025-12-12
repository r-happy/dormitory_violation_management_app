import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { UserRole } from '../auth/user.entity';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  const mockStudentService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: StudentService,
          useValue: mockStudentService,
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addStudent', () => {
    it('should create a student', async () => {
      const createDto = {
        name: 'Test Student',
        sexId: 1,
        classId: 1,
        roomNumber: 101,
        roleId: 1,
      };
      const expectedResult = { id: 1, ...createDto };

      mockStudentService.create.mockResolvedValue(expectedResult);

      const result = await controller.addStudent(createDto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('getStudents', () => {
    it('should return an array of students without filters', async () => {
      const expectedResult = [
        {
          id: 1,
          name: 'Test Student',
          sexId: 1,
          classId: 1,
          roomNumber: 101,
          roleId: 1,
        },
      ];

      mockStudentService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.getStudents();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return filtered students by name', async () => {
      const expectedResult = [
        {
          id: 1,
          name: 'Test Student',
          sexId: 1,
          classId: 1,
          roomNumber: 101,
          roleId: 1,
        },
      ];

      mockStudentService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.getStudents('Test');

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith({
        name: 'Test',
        sexId: undefined,
        classId: undefined,
        roomNumber: undefined,
        point: undefined,
      });
    });

    it('should return filtered students by classId', async () => {
      const expectedResult = [
        {
          id: 1,
          name: 'Test Student',
          sexId: 1,
          classId: 1,
          roomNumber: 101,
          roleId: 1,
        },
      ];

      mockStudentService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.getStudents(undefined, undefined, 1);

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith({
        name: undefined,
        sexId: undefined,
        classId: 1,
        roomNumber: undefined,
        point: undefined,
      });
    });
  });

  describe('getSpecifiedStudent', () => {
    it('should return a specific student for authorized user', async () => {
      const expectedResult = {
        id: 1,
        name: 'Test Student',
        sexId: 1,
        classId: 1,
        roomNumber: 101,
        roleId: 1,
      };

      mockStudentService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.getSpecifiedStudent(1, {
        role: UserRole.DOMITORY_STAFF,
      });

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should allow student to view their own data', async () => {
      const expectedResult = {
        id: 1,
        name: 'Test Student',
        sexId: 1,
        classId: 1,
        roomNumber: 101,
        roleId: 1,
      };

      mockStudentService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.getSpecifiedStudent(1, {
        role: UserRole.STUDENT,
        relatedId: 1,
      });

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw ForbiddenException when student tries to view other student data', async () => {
      await expect(
        controller.getSpecifiedStudent(2, {
          role: UserRole.STUDENT,
          relatedId: 1,
        }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('updateStudent', () => {
    it('should update a student', async () => {
      const updateDto = {
        name: 'Updated Student',
        sexId: 1,
        classId: 2,
        roomNumber: 102,
        roleId: 1,
      };
      const expectedResult = { id: 1, ...updateDto };

      mockStudentService.update.mockResolvedValue(expectedResult);

      const result = await controller.updateStudent(1, updateDto);

      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('deleteStudent', () => {
    it('should delete a student', async () => {
      mockStudentService.remove.mockResolvedValue(undefined);

      await controller.deleteStudent(1);

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});

describe('StudentService', () => {
  let service: StudentService;
  let repository: Repository<Student>;

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
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    having: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    repository = module.get<Repository<Student>>(getRepositoryToken(Student));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a student', async () => {
      const createData = {
        name: 'Test Student',
        sexId: 1,
        classId: 1,
        roomNumber: 101,
        roleId: 1,
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

    it('should return all students without filters', async () => {
      const expectedResult = [
        {
          id: 1,
          name: 'Test Student',
          sexId: 1,
          classId: 1,
          roomNumber: 101,
          roleId: 1,
        },
      ];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('student');
    });

    it('should filter by name', async () => {
      const expectedResult = [
        {
          id: 1,
          name: 'Test Student',
          sexId: 1,
          classId: 1,
          roomNumber: 101,
          roleId: 1,
        },
      ];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll({ name: 'Test' });

      expect(result).toEqual(expectedResult);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'student.name LIKE :name',
        { name: '%Test%' },
      );
    });

    it('should filter by sexId', async () => {
      const expectedResult = [
        {
          id: 1,
          name: 'Test Student',
          sexId: 1,
          classId: 1,
          roomNumber: 101,
          roleId: 1,
        },
      ];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll({ sexId: 1 });

      expect(result).toEqual(expectedResult);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'student.sexId = :sexId',
        { sexId: 1 },
      );
    });

    it('should filter by classId', async () => {
      const expectedResult = [
        {
          id: 1,
          name: 'Test Student',
          sexId: 1,
          classId: 1,
          roomNumber: 101,
          roleId: 1,
        },
      ];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll({ classId: 1 });

      expect(result).toEqual(expectedResult);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'student.classId = :classId',
        { classId: 1 },
      );
    });

    it('should filter by roomNumber', async () => {
      const expectedResult = [
        {
          id: 1,
          name: 'Test Student',
          sexId: 1,
          classId: 1,
          roomNumber: 101,
          roleId: 1,
        },
      ];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll({ roomNumber: 101 });

      expect(result).toEqual(expectedResult);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'student.roomNumber = :roomNumber',
        { roomNumber: 101 },
      );
    });

    it('should filter by point', async () => {
      const expectedResult = [
        {
          id: 1,
          name: 'Test Student',
          sexId: 1,
          classId: 1,
          roomNumber: 101,
          roleId: 1,
        },
      ];

      mockQueryBuilder.getMany.mockResolvedValue(expectedResult);

      const result = await service.findAll({ point: 10 });

      expect(result).toEqual(expectedResult);
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'student.violations',
        'violation',
      );
      expect(mockQueryBuilder.groupBy).toHaveBeenCalledWith('student.id');
      expect(mockQueryBuilder.having).toHaveBeenCalledWith(
        'SUM(violation.point) = :point',
        { point: 10 },
      );
    });
  });

  describe('findOne', () => {
    it('should return a student by id', async () => {
      const expectedResult = {
        id: 1,
        name: 'Test Student',
        sexId: 1,
        classId: 1,
        roomNumber: 101,
        roleId: 1,
      };

      mockRepository.findOne.mockResolvedValue(expectedResult);

      const result = await service.findOne(1);

      expect(result).toEqual(expectedResult);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if student not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'Student with ID 999 not found',
      );
    });
  });

  describe('update', () => {
    it('should update a student', async () => {
      const updateData = {
        name: 'Updated Student',
        sexId: 1,
        classId: 2,
        roomNumber: 102,
        roleId: 1,
      };
      const existingStudent = {
        id: 1,
        name: 'Test Student',
        sexId: 1,
        classId: 1,
        roomNumber: 101,
        roleId: 1,
      };
      const updatedStudent = { id: 1, ...updateData };

      mockRepository.findOne
        .mockResolvedValueOnce(existingStudent)
        .mockResolvedValueOnce(updatedStudent);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.update(1, updateData);

      expect(result).toEqual(updatedStudent);
      expect(repository.update).toHaveBeenCalledWith(1, updateData);
    });

    it('should throw NotFoundException if student not found on update', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(
        service.update(999, {
          name: 'Updated Student',
          sexId: 1,
          classId: 2,
          roomNumber: 102,
          roleId: 1,
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a student', async () => {
      const existingStudent = {
        id: 1,
        name: 'Test Student',
        sexId: 1,
        classId: 1,
        roomNumber: 101,
        roleId: 1,
      };

      mockRepository.findOne.mockResolvedValue(existingStudent);
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if student not found on delete', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
