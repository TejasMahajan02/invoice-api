import { IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Type } from 'class-transformer';


export class PaginationParams {
    @IsOptional()
    @Type(()=>Number)
    @Min(0)
    @IsNumber()
    skip?:number;

    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    @Min(1)
    limit?:number;                                                                                                       

    @IsOptional()
    @IsString()
    access_user?:string;
}