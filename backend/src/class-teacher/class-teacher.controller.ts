import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ClassTeacherService } from './class-teacher.service';
import { ClassTeacher } from './class-teacher.entity';
import {
  CreateClassTeacherDto,
  UpdateClassTeacherDto,
} from './class-teacher.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../auth/user.entity';

@Controller('classTeachers')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({ transform: true }))
export class ClassTeacherController {
  constructor(private readonly classTeacherService: ClassTeacherService) {}

  @Post()
  @Roles(UserRole.DOMITORY_STAFF)
  @HttpCode(HttpStatus.CREATED)
  async addClassTeacher(
    @Body() body: CreateClassTeacherDto,
  ): Promise<ClassTeacher> {
    return this.classTeacherService.create(body);
  }

  @Get()
  @Roles(UserRole.CLASS_TEACHER, UserRole.DOMITORY_STAFF)
  async getClassTeachers(
    @Query('name') name?: string,
    @Query('classId', new ParseIntPipe({ optional: true })) classId?: number,
  ): Promise<ClassTeacher[]> {
    return this.classTeacherService.findAll({ name, classId });
  }

  @Get(':classTeacherId')
  @Roles(UserRole.CLASS_TEACHER, UserRole.DOMITORY_STAFF)
  async getSpecifiedClassTeacher(
    @Param('classTeacherId', ParseIntPipe) classTeacherId: number,
  ): Promise<ClassTeacher> {
    return this.classTeacherService.findOne(classTeacherId);
  }

  @Put(':classTeacherId')
  @Roles(UserRole.DOMITORY_STAFF)
  async updateClassTeacher(
    @Param('classTeacherId', ParseIntPipe) classTeacherId: number,
    @Body() body: UpdateClassTeacherDto,
  ): Promise<ClassTeacher> {
    return this.classTeacherService.update(classTeacherId, body);
  }

  @Delete(':classTeacherId')
  @Roles(UserRole.DOMITORY_STAFF)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteClassTeacher(
    @Param('classTeacherId', ParseIntPipe) classTeacherId: number,
  ): Promise<void> {
    return this.classTeacherService.remove(classTeacherId);
  }
}
