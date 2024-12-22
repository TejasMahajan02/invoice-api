import { IPaymentRequest } from "src/Interface/Requests/IPayment.request";
import { GenericSchema } from "./generic.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


@Schema()
export class Payment extends GenericSchema implements IPaymentRequest {

    @Prop({ type: Types.ObjectId, ref: 'Customer' })
    customerId: string;

    @Prop()
    customerName: string;

    @Prop()
    paymentDate: Date;

    @Prop()
    amount: number;

    // @Prop()
    // amountInBank: number;

    // @Prop()
    // bankCharges: number;

    @Prop()
    refNumber: string;

    // @Prop()
    // description: string;

    // @Prop()
    // document: string;

}

export const PaymentSchema = SchemaFactory.createForClass(Payment);