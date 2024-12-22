import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ItemDetailDto{
    @ApiProperty()
    @IsNotEmpty()
    productId: string;

    @ApiProperty()
    @IsNotEmpty()
    quantity: number;
}