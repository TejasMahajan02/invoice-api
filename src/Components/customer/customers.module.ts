import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from 'src/dataModels/Schemas/customer.schema';
import { CustomerService } from './customers.service';
import { CustomerController } from './customers.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Customer.name,
                schema: CustomerSchema
            }
        ]), UserModule
    ],
    providers: [CustomerService, AuthService ,JwtService],
    controllers: [CustomerController],
    exports: [CustomerService, AuthService],
})
export class CustomerModule {}
