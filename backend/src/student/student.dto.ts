import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  sexId: number;

  @IsNumber()
  @IsNotEmpty()
  classId: number;

  @IsNumber()
  @IsNotEmpty()
  roomNumber: number;

  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}

export class UpdateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  sexId: number;

  @IsNumber()
  @IsNotEmpty()
  classId: number;

  @IsNumber()
  @IsNotEmpty()
  roomNumber: number;

  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}
