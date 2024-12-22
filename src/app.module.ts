import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Components/auth/auth.module';
import { InvoiceModule } from './Components/invoice/invoice.module';
import { ProductsModule } from './Components/products/products.module';
import { CustomerModule } from './Components/customer/customers.module';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './Services/gridFsMulterConfigService.service';
import { UserModule } from './Components/user/user.module';
import { PaymentModule } from './Components/payment/payment.module';
import { BalanceSheetModule } from './Components/balance-sheet/balance-sheet.module';
import { PdfmakerModule } from './Components/pdfmaker/pdfmaker.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
    AuthModule,
    InvoiceModule,
    ProductsModule,
    CustomerModule,
    UserModule,
    PaymentModule,
    BalanceSheetModule,
    PdfmakerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
