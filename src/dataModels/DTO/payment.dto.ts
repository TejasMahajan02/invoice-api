import { IPayment } from "src/Interface/Dist/IPayment";
import { GenericDto } from "./generic.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, isNotEmpty, IsNumber, IsString } from "class-validator";

export class PaymentDto extends GenericDto implements IPayment{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    customerName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    customerId: string;

    @ApiProperty()
    @IsString()
    paymentDate: Date;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    // @ApiProperty()
    // amountInBank: number;

    // @ApiProperty()
    // bankCharges: number;

    @ApiProperty()
    @IsNotEmpty()
    refNumber: string;

    // @ApiProperty()
    // description: string;

    // @ApiProperty()
    // document: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    productId: string;

    
}