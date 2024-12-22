import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { v4 } from "uuid";

export class GenericDto {
  // @IsString()
  // @IsOptional()
  // id: string = v4();

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean = false;

  @IsString()
  @IsOptional()
  createdUser: string;

  @IsString()
  @IsOptional()
  modifiedUser?: string;

  @IsString()
  @IsOptional()
  deletedUser?: string;

  @IsDate()
  @IsOptional()
  createdDate: Date = new Date();

  @IsDate()
  @IsOptional()
  modifiedDate?: Date;

  @IsDate()
  @IsOptional()
  deletedDate?: Date;
}
