import { Module, forwardRef } from '@nestjs/common';
import { BalanceSheetService } from './balance-sheet.service';
import { BalanceSheetController } from './balance-sheet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceSheeetSchema, BalanceSheet } from 'src/dataModels/Schemas/balanceSheet.schema';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { InvoiceService } from '../invoice/invoice.service';
import { PaymentService } from '../payment/payment.service';
import { InvoiceModule } from '../invoice/invoice.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: BalanceSheet.name,
      schema: BalanceSheeetSchema
    }]),
    UserModule,
    JwtModule,
    PaymentModule,
    InvoiceModule,
  ],
  providers: [BalanceSheetService, AuthService],
  controllers: [BalanceSheetController],
  exports: [BalanceSheetService]
})
export class BalanceSheetModule { }
