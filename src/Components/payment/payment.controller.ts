import { Body, Controller, Get, Param, Post, Query, Delete, Req, UseGuards, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaymentDto } from 'src/dataModels/DTO/payment.dto';
import { GenericSchema } from 'src/dataModels/Schemas/generic.schema';
import { PaginationParams } from 'src/dataModels/DTO/pagination.params.dto';
import { FilterQuery } from 'mongoose';
import { Payment } from 'src/dataModels/Schemas/payment.schema';
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { Request } from 'express';

@Controller('payment')
@ApiTags('Payment')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
export class PaymentController {
    constructor(private _paymentServ: PaymentService) { }

    @Post()
    async create(@Req() req: Request, @Body() paymentDto: PaymentDto): Promise<GenericSchema | Payment> {
        const loggedInUser = req['user'];
        paymentDto.createdUser = loggedInUser._id;
        return await this._paymentServ.create(paymentDto);
    }

    @Get()
    async getAll(@Req() req: Request, @Query() { skip, limit }: PaginationParams) {
        const loggedInUser = req['user'];

        const query: FilterQuery<PaymentDto> = {
            isDeleted: false,
            createdUser: loggedInUser._id
        }
        return await this._paymentServ.findAll(query, { skip, limit });
    }

    @Delete(':id')
    async deleteInvoice(@Param('id') id: string): Promise<Payment> {
        return await this._paymentServ.delete({ _id: id, isDeleted: false }, id);
    }

    @Put(':id')
    async findAndUpdate(@Body() invoiceDto: Partial<PaymentDto>, @Param('id') id: string) {
        const data = await this._paymentServ.update({ _id: id }, invoiceDto);
        console.log(data);
        return data;
    }
}
