import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/dataModels/Schemas/product.schema';
import { ProductsController } from './products.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { ItemDetail, ItemDetailSchema } from 'src/dataModels/Schemas/itemDetail.schema';
import { ItemDetailService } from './item-detail.service';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : Product.name,
        schema : ProductSchema
      },
      {
        name : ItemDetail.name,
        schema : ItemDetailSchema
      }
    ]), 
    UserModule
  ],
  providers: [ProductsService, AuthService ,JwtService, ItemDetailService],
  controllers : [ProductsController],
  exports : [ProductsService, ItemDetailService]
})
export class ProductsModule {}
