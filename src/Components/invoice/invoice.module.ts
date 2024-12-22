import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, InvoiceSchema } from 'src/dataModels/Schemas/invoiceSchema';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PdfmakerModule } from '../pdfmaker/pdfmaker.module';
import { ProductsModule } from '../products/products.module';
import { CustomerModule } from '../customer/customers.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Invoice.name,
                schema: InvoiceSchema
            }
        ]), 
        UserModule, 
        JwtModule,
        PdfmakerModule,
        ProductsModule,
        CustomerModule
    ],
    controllers: [InvoiceController],
    providers: [InvoiceService, AuthService],
    exports: [InvoiceService]
})
export class InvoiceModule { }
