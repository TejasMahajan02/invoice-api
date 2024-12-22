import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from 'src/dataModels/DTO/product.dto';
import { GenericSchema } from 'src/dataModels/Schemas/generic.schema';
import { Product } from 'src/dataModels/Schemas/product.schema';
import { PaginationParams } from 'src/dataModels/DTO/pagination.params.dto';
import { FilterQuery } from 'mongoose';
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from "express";
import { HttpResponseDto } from 'src/Shared/dtos/http-response.dto';

@Controller('products')
@ApiTags('Products')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
export class ProductsController {
    constructor(private _productServ: ProductsService) { }

    @Post()
    async create(
        @Req() req: Request,
        @Body() createDto: ProductDto
    ): Promise<GenericSchema | Product> {
        const loggedInUser = req['user'];

        const query: FilterQuery<Product> = {
            isDeleted: false,
            createdUser: loggedInUser._id,
            productName: createDto.productName,
            productDescription: createDto.productDescription,
            price: createDto.price
        }

        const productEntity = await this._productServ.findOne(query);
        if (productEntity) throw new BadRequestException('Product already exist with same values.');

        createDto.createdUser = loggedInUser._id;
        return await this._productServ.create(createDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Product> {
        return await this._productServ.findOne({ isDeleted: false, _id: id });
    }

    @Get()
    async findAllByUser(@Req() req: Request, @Query() { skip, limit }: PaginationParams) {

        const loggedInUser = req['user'];

        const query: FilterQuery<ProductDto> = {
            isDeleted: false,
            createdUser: loggedInUser._id,
        }

        return await this._productServ.findAll(query, { skip, limit });
    }

    @Put(':id')
    async updateOne(@Param('id') id: string, @Body() updateDto: Partial<ProductDto>) {

        const query: FilterQuery<ProductDto> = {
            isDeleted: false,
            _id: id,
        }

        const updatedProduct = await this._productServ.update(query, updateDto);
        if (!updatedProduct) throw new NotFoundException('Product not exist.');

        return new HttpResponseDto('Product updated successfully.', updatedProduct);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        const query: FilterQuery<ProductDto> = {
            isDeleted: false,
            _id: id,
        }

        const deletedProduct = await this._productServ.delete(query, id);
        if (!deletedProduct) throw new NotFoundException('Product not exist.');

        return new HttpResponseDto('Product deleted successfully.');
    }
}
