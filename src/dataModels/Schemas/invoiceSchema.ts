import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { GenericSchema } from "./generic.schema";
import { IInvoiceRequest, IItemDetail } from "src/Interface/Requests/invoice.request";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

@Schema()
export class Invoice extends GenericSchema {
    @Prop({ type: Types.ObjectId, ref: 'Customer' })
    @ApiProperty()
    customerId: string;

    @Prop()
    @ApiProperty()
    invoiceDate: Date;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'ItemDetail' }], required: true })
    @ApiProperty()
    itemDetails: Types.ObjectId[]; // References to ItemDetail collection
}

// export type InvoiceDocument = Invoice & Document;
export const InvoiceSchema = SchemaFactory.createForClass(Invoice);

