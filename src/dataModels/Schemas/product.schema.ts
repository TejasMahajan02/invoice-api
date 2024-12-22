import { IProductRequest } from "src/Interface/Requests/product.request";
import { GenericSchema } from "./generic.schema"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Product extends GenericSchema implements IProductRequest {
    @Prop()
    gstPercentage: number;

    @Prop()
    productName: string;

    @Prop()
    productDescription: string;

    @Prop({ required: true })
    price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product)