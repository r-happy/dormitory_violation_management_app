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
  ForbiddenException,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserRole } from '../auth/user.entity';

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({ transform: true }))
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Roles(UserRole.DOMITORY_STAFF)
  @HttpCode(HttpStatus.CREATED)
  async addStudent(@Body() body: CreateStudentDto): Promise<Student> {
    return this.studentService.create(body);
  }

  @Get()
  @Roles(UserRole.CLASS_TEACHER, UserRole.DOMITORY_STAFF)
  async getStudents(
    @Query('name') name?: string,
    @Query('sexId', new ParseIntPipe({ optional: true })) sexId?: number,
    @Query('classId', new ParseIntPipe({ optional: true })) classId?: number,
    @Query('roomNumber', new ParseIntPipe({ optional: true }))
    roomNumber?: number,
    @Query('point', new ParseIntPipe({ optional: true })) point?: number,
  ): Promise<Student[]> {
    return this.studentService.findAll({
      name,
      sexId,
      classId,
      roomNumber,
      point,
    });
  }

  @Get(':userId')
  @Roles(UserRole.CLASS_TEACHER, UserRole.DOMITORY_STAFF, UserRole.STUDENT)
  async getSpecifiedStudent(
    @Param('userId', ParseIntPipe) userId: number,
    @CurrentUser() user: any,
  ): Promise<Student> {
    if (user.role === UserRole.STUDENT && user.relatedId !== userId) {
      throw new ForbiddenException('Students can only view their own data');
    }
    return this.studentService.findOne(userId);
  }

  @Put(':userId')
  @Roles(UserRole.DOMITORY_STAFF)
  async updateStudent(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: UpdateStudentDto,
  ): Promise<Student> {
    return this.studentService.update(userId, body);
  }

  @Delete(':userId')
  @Roles(UserRole.DOMITORY_STAFF)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteStudent(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    return this.studentService.remove(userId);
  }
}
