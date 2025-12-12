import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDomitoryStaffDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateDomitoryStaffDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
