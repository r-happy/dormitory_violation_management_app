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
import { DomitoryStaffService } from './domitory-staff.service';
import { DomitoryStaff } from './domitory-staff.entity';
import {
  CreateDomitoryStaffDto,
  UpdateDomitoryStaffDto,
} from './domitory-staff.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../auth/user.entity';

@Controller('domitoryStaffs')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({ transform: true }))
export class DomitoryStaffController {
  constructor(private readonly domitoryStaffService: DomitoryStaffService) {}

  @Post()
  @Roles(UserRole.DOMITORY_STAFF)
  @HttpCode(HttpStatus.CREATED)
  async addDomitoryStaff(
    @Body() body: CreateDomitoryStaffDto,
  ): Promise<DomitoryStaff> {
    return this.domitoryStaffService.create(body);
  }

  @Get()
  @Roles(UserRole.CLASS_TEACHER, UserRole.DOMITORY_STAFF)
  async getDomitoryStaffs(
    @Query('name') name?: string,
  ): Promise<DomitoryStaff[]> {
    return this.domitoryStaffService.findAll({ name });
  }

  @Get(':domitoryStaffId')
  @Roles(UserRole.CLASS_TEACHER, UserRole.DOMITORY_STAFF)
  async getSpecifiedDomitoryStaff(
    @Param('domitoryStaffId', ParseIntPipe) domitoryStaffId: number,
  ): Promise<DomitoryStaff> {
    return this.domitoryStaffService.findOne(domitoryStaffId);
  }

  @Put(':domitoryStaffId')
  @Roles(UserRole.DOMITORY_STAFF)
  async updateDomitoryStaff(
    @Param('domitoryStaffId', ParseIntPipe) domitoryStaffId: number,
    @Body() body: UpdateDomitoryStaffDto,
  ): Promise<DomitoryStaff> {
    return this.domitoryStaffService.update(domitoryStaffId, body);
  }

  @Delete(':domitoryStaffId')
  @Roles(UserRole.DOMITORY_STAFF)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDomitoryStaff(
    @Param('domitoryStaffId', ParseIntPipe) domitoryStaffId: number,
  ): Promise<void> {
    return this.domitoryStaffService.remove(domitoryStaffId);
  }
}
