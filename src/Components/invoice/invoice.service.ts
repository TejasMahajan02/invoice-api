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
        return this.invoiceModel.findOne({ _id: id })
            .populate({
                path: 'itemDetails',
                populate: { path: 'productId' }  // Populating the product details
            })
            .populate('customerId')
            .exec();
    }

}

