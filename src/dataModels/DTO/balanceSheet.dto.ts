import { GenericDto } from "./generic.dto"
import { IBalanceSheet } from "src/Interface/Dist/IBalanceSheet";
import { ApiProperty } from "@nestjs/swagger";

export class BalanceSheetDto extends GenericDto implements IBalanceSheet{

    @ApiProperty()
    customerId: string;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    IsInvoice: boolean;

    @ApiProperty()
    IsPayment: boolean;

    @ApiProperty()
    debitAmount: number;

    @ApiProperty()
    creditAmount: number;
}