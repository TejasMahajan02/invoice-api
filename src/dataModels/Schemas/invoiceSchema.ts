import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { GenericSchema } from "./generic.schema";
import { IInvoiceRequest, IItemDetail } from "src/Interface/Requests/invoice.request";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { ItemDetail } from "./itemDetail.schema";

@Schema()
export class Invoice extends GenericSchema implements IInvoiceRequest {
    @Prop({ type: Types.ObjectId, ref: 'Customer' })
    @ApiProperty()
    customerId: string;

    @Prop()
    @ApiProperty()
    invoiceDate: Date;

    @Prop({ type: [ItemDetail], required: true })  // Embed ItemDetail directly
    @ApiProperty()
    itemDetails: ItemDetail[];
}

// export type InvoiceDocument = Invoice & Document;
export const InvoiceSchema = SchemaFactory.createForClass(Invoice);

