import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { GenericService } from 'src/Shared/generic.service';
import { InvoiceDto } from 'src/dataModels/DTO/Invoice.dto';
import { Invoice } from 'src/dataModels/Schemas/invoiceSchema';
import { PdfmakerService } from '../pdfmaker/pdfmaker.service';
import { Response } from "express";
import { generateInvoiceDocDefination } from 'src/Shared/utils/helpers.util';

@Injectable()
export class InvoiceService extends GenericService<InvoiceDto, Invoice> {
    constructor(
        @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
        private readonly pdfmakerService: PdfmakerService
    ) {
        super(invoiceModel);
    }

    async generateInvoicePdf(id: string) {
        return await this.invoiceModel
            .findOne({ _id: id, isDeleted: false })
            .populate({ path: 'customerId', model: 'Customer' })// Populate Customer details
            .exec();
    }

    async getPdf(res: Response, createDto: Invoice) {
        return await this.pdfmakerService.generateAndDownloadPdf(res, generateInvoiceDocDefination(createDto));
    }


    async findOneById(id: string): Promise<Invoice> {
        const query: FilterQuery<Invoice> = {
            isDeleted: false,
            _id: id
        };

        return this.invoiceModel.findOne(query)
            .populate({
                path: 'itemDetails',
                populate: {
                    path: 'productId', // Make sure productId is populated within itemDetails
                    select: 'productName price' // Optionally select specific fields from Product (e.g., name and price)
                }
            })
            .populate('customerId')  // Populate customerId at the top level
            .exec() as Promise<Invoice>;
    }



}

