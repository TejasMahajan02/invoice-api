import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { GenericService } from 'src/Shared/generic.service';
import { ProductDto } from 'src/dataModels/DTO/product.dto';
import { Product } from 'src/dataModels/Schemas/product.schema';

@Injectable()
export class ProductsService extends GenericService<ProductDto, Product> {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {
        super(productModel);
    }

    async validateProductByEmail(email: string) {
        const filterQuery: FilterQuery<Product> = {
            $and: [{
                isDeleted: false,
                email: email,
            }]
        }

        const productEntity = await this.findOne(filterQuery);
        if (!productEntity) throw new NotFoundException('Product not found.');
        return productEntity;
    }

    async validateProductById(id: string) {
        const filterQuery: FilterQuery<Product> = {
            $and: [{
                isDeleted: false,
                _id : id
            }]
        }

        const productEntity = await this.findOne(filterQuery);
        if (!productEntity) throw new NotFoundException('Product not found.');
        return productEntity;
    }

    async findOneById(id: string) {
        const filterQuery: FilterQuery<Product> = {
            $and: [{
                isDeleted: false,
                _id : id
            }]
        }

        return await this.findOne(filterQuery);
    }

    async findOneByEmail(email: string) {
        const filterQuery: FilterQuery<Product> = {
            $and: [{
                isDeleted: false,
                email
            }]
        }

        return await this.findOne(filterQuery);
    }


    async isProductExist(email: string) {
        const filterQuery: FilterQuery<Product> = {
            $and: [{
                isDeleted: false,
                email: email,
            }]
        };

        const isExist = await this.isExist(filterQuery);
        if (isExist) throw new BadRequestException('Product already exist.');
    }
}
