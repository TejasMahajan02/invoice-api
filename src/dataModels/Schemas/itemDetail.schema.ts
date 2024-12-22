import { GenericSchema } from "./generic.schema"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IItemDetail } from "src/Interface/Requests/invoice.request";

@Schema()
export class ItemDetail extends GenericSchema implements IItemDetail {
    @Prop({ type: Types.ObjectId, ref: 'Product' })
    @ApiProperty()
    productId: string;

    @Prop({ required: true, min: 1 })
    @ApiProperty({default : 1})
    quantity: number = 1;
}

export const ItemDetailSchema = SchemaFactory.createForClass(ItemDetail)