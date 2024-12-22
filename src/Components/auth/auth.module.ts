import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from 'src/dataModels/Schemas/customer.schema';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY, // Ensure this is correctly set
      signOptions: { expiresIn: '10h' },
      global : true
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
