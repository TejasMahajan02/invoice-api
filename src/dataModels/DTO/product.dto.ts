import { IProduct } from "src/Interface/Dist/IProduts";
import { GenericDto } from "./generic.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductDto extends GenericDto implements IProduct{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    gstPercentage: number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    productName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    productDescription: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number;
}