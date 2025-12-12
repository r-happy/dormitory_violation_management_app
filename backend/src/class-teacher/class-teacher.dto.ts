import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateClassTeacherDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  classId: number;
}

export class UpdateClassTeacherDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  classId: number;
}
