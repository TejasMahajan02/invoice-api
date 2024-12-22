import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from 'src/dataModels/Schemas/payment.schema';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Module({
  imports :[
    MongooseModule.forFeature([
      {
        name : Payment.name,
        schema : PaymentSchema
      }
    ]), JwtModule, UserModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService, AuthService],
  exports : [PaymentService]
})
export class PaymentModule {

}
