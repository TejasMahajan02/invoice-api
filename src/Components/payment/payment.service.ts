import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericService } from 'src/Shared/generic.service';
import { PaymentDto } from 'src/dataModels/DTO/payment.dto';
import { Payment } from 'src/dataModels/Schemas/payment.schema';

@Injectable()
export class PaymentService extends GenericService<PaymentDto, Payment> {
    constructor(@InjectModel(Payment.name) private paymentModel : Model<Payment>){
        super(paymentModel);
    }
}
