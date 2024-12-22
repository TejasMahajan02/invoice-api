import { Prop } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { v4 } from 'uuid';

export abstract class GenericSchema extends Document {
    // @Prop({
    //     required: true,
    //     type: String,
    //     default: function genUUID() {
    //         return v4();
    //     },
    // })
    // id: string;

    @Prop({
        required: true,
        type: Boolean,
        default: false,
    })
    isDeleted: boolean;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdUser: string;

    @Prop()
    modifiedUser: string;

    @Prop()
    deletedUser: string;

    @Prop({
        required: true,
        type: Date,
        default: new Date(),
    })
    createdDate: Date;

    @Prop()
    modifiedDate: Date;

    @Prop()
    deletedDate: Date;
}