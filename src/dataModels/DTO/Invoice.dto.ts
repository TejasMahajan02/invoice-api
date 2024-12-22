import { GenericDto } from "./generic.dto";
import { IInvoice } from "src/Interface/Dist/IInvoice";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { ItemDetailDto } from "./item-detail.dto";
import { Type } from "class-transformer";

export class InvoiceDto extends GenericDto implements IInvoice {
    @ApiProperty()
    @IsNotEmpty()
    customerId: string;

    @ApiProperty()
    @IsNotEmpty()
    invoiceDate: Date;

    @ApiProperty({ type: [ItemDetailDto] })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ItemDetailDto)
    itemDetails: ItemDetailDto[];
}