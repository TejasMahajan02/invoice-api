import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { GenericSchema } from "./generic.schema";
import { IGenericInterface } from "src/Shared/generic.interface";
import { IUserrequest } from "src/Interface/Requests/IUser.request";
import { IsEmail } from "class-validator";

@Schema()
export class User extends GenericSchema implements IUserrequest {
    @Prop()
    city: string;

    @Prop({ required: true })
    country: string;

    @Prop()
    state: string;

    @Prop({ required: true })
    firstName?: string;

    @Prop()
    lastName?: string;

    @Prop({ required: true })
    @IsEmail()
    email: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true })
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
