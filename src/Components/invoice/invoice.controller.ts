import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { InvoiceDto } from 'src/dataModels/DTO/Invoice.dto';
import { Invoice } from 'src/dataModels/Schemas/invoiceSchema';
import { GenericSchema } from 'src/dataModels/Schemas/generic.schema';
import { PaginationParams } from 'src/dataModels/DTO/pagination.params.dto';
import { FilterQuery } from 'mongoose';
import { ExpressJWTRequest } from '../auth/interfaces/IExpressJwt.request';
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { Response, Request } from "express";
import { ProductsService } from '../products/products.service';
import { HttpResponseDto } from 'src/Shared/dtos/http-response.dto';
import { CustomerService } from '../customer/customers.service';
import { ItemDetailService } from '../products/item-detail.service';

@Controller('invoice')
@ApiTags('Invoice')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
export class InvoiceController {

    constructor(
        private _invoiceServ: InvoiceService,
        private _customerServ: CustomerService,
        private _productsServ: ProductsService,
        private _itemDetailServ: ItemDetailService,
    ) { }

    @Post()
    async create(@Req() req: Request, @Body() createdDto: InvoiceDto) {
        // 1️⃣ Validate Customer
        const customerEntity = await this._customerServ.validateCustomerById(createdDto.customerId);
        if (!customerEntity) {
            throw new BadRequestException(`Invalid customer ID: ${createdDto.customerId}`);
        }

        // 2️⃣ Validate Product IDs
        const productIds = createdDto.itemDetails.map(item => item.productId);
        const products = await Promise.all(productIds.map(productId => this._productsServ.findOneById(productId)));

        const invalidProductIds = createdDto.itemDetails
            .filter((_, index) => !products[index])
            .map(item => item.productId);

        if (invalidProductIds.length > 0) {
            throw new BadRequestException(`Invalid product IDs: ${invalidProductIds.join(', ')}`);
        }

        // 3️⃣ Check for Duplicate `ItemDetail` Entries
        const itemDetailIds = await Promise.all(
            createdDto.itemDetails.map(async item => {
                const existingItem = await this._itemDetailServ.findOne({
                    productId: item.productId,
                    quantity: item.quantity,
                });

                if (existingItem) {
                    return existingItem._id; // Reuse existing `ItemDetail`
                }

                // If not found, create a new `ItemDetail`
                const newItem = await this._itemDetailServ.create(item);
                return newItem._id;
            })
        );

        // 4️⃣ Check for Duplicate Invoice
        const existingInvoice = await this._invoiceServ.findOne({
            customerId: createdDto.customerId,
            invoiceDate: createdDto.invoiceDate,
            itemDetails: { $in: itemDetailIds },
        });

        if (existingInvoice) {
            throw new BadRequestException('Duplicate invoice for this customer and product(s) on this date');
        }

        // 5️⃣ Create the Invoice
        const loggedInUser = req['user'];
        const newInvoice = {
            ...createdDto,
            itemDetails: itemDetailIds, // Use the validated `ItemDetail` IDs
            createdUser: loggedInUser._id,
        };

        return await this._invoiceServ.create(newInvoice);
    }


    @Get(':id')
    async findOne(@Param('id') id: string) {
        // Step 1: Fetch the Invoice document
        const invoiceEntity = await this._invoiceServ.findOne({ _id: id, isDeleted: false }, 'customerId itemDetails');
        
        // Step 2: Get all ItemDetails using the IN operator
        const itemDetailIds = invoiceEntity.itemDetails.map(item => item.toString());
        const itemDetails = await this._itemDetailServ.findByIds(itemDetailIds);
        
        // Add the fetched ItemDetails back into the Invoice entity (optional, depending on your needs)
        invoiceEntity['ItemDetails'] = itemDetails;
    
        return invoiceEntity;
    }
    

    @Put(':id')
    async updateOne(@Param('id') id: string, @Body() updateDto: Partial<InvoiceDto>) {
        const query: FilterQuery<Invoice> = {
            isDeleted: false,
            _id: id
        }
        const updatedInvoice = await this._invoiceServ.update(query, updateDto);
        if (!updatedInvoice) throw new NotFoundException('Invoice not exist.');

        return new HttpResponseDto('Invoice updated successfully.', updatedInvoice);
    }

    @Get()
    async findAllByUser(
        @Req() req: Request,
        @Query() { skip, limit }: PaginationParams
    ) {
        const loggedInUser = req['user'];

        const query: FilterQuery<Invoice> = {
            isDeleted: false,
            createdUser: loggedInUser._id
        }

        return await this._invoiceServ.findAll(query, { skip, limit });
    }

    @Delete(':id')
    async deleteInvoice(@Param('id') id: string) {
        const query: FilterQuery<Invoice> = {
            isDeleted: false,
            _id: id
        }

        const deletedProduct = await this._invoiceServ.delete(query, id);
        if (!deletedProduct) throw new NotFoundException('Invoice not exist.');

        return new HttpResponseDto('Invoice deleted successfully.');
    }

    @Post('pdf/:id')
    async generateInvoicePdf(@Res() res: Response, @Param('id') id: string) {
        console.log(await this._invoiceServ.generateInvoicePdf(id))
        await this._invoiceServ.findOne({ id, isDeleted: false }, ['product'])
        res.send({ id });
        // return await this._invoiceServ.getPdf(res, createDto);
    }

}
