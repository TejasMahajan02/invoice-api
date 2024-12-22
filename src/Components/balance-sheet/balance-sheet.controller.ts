import { Controller, Get, Param, ParseUUIDPipe, Req, UseGuards } from '@nestjs/common';
import { BalanceSheetService } from './balance-sheet.service';
import { ExpressJWTRequest } from '../auth/interfaces/IExpressJwt.request';
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterQuery } from 'mongoose';
import { PaymentService } from '../payment/payment.service';
import { InvoiceService } from '../invoice/invoice.service';
import { Invoice } from 'src/dataModels/Schemas/invoiceSchema';
import { Request } from "express";

@Controller('balance-sheet')
@ApiTags('Balance-sheet')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
export class BalanceSheetController {
    constructor(private _balanceSheetServ: BalanceSheetService, private _paymentServ: PaymentService, private _invoiceServ: InvoiceService) { }

    @Get(':customerId')
    async getAllEntriesOfCustomer(
        @Req() req: Request,
        @Param('customerId') customerId: string
    ) {

        return this._balanceSheetServ.getAllEntriesOfCustomer(req['user']?.uuid, customerId)
        // const query: FilterQuery<Invoice> = {
        //     isDeleted: false,
        //     customerId: customerId,
        //     createdUser: req.user.tokenDetails.uuid
        // }

        // console.log(query);
        // var invoiceData = await this._invoiceServ.findAll(query, { skip: 0, limit: 30 });
        // var paymentData = await this._paymentServ.findAll(query, { skip: 0, limit: 30 });

        // console.log(invoiceData);

        // let jointArray: any = [...invoiceData.results, ...paymentData.results];
        // let balanceSheetArray = [];

        // jointArray.map((item) => {
        //     if (item.invoiceDate) {
        //         balanceSheetArray.push({
        //             date: item.invoiceDate,
        //             IsInvoice: true,
        //             customerId: customerId,
        //             IsPayment: false,
        //             debitAmount: item.subTotal,
        //             creditAmount: 0,
        //         })
        //     } else {
        //         balanceSheetArray.push({
        //             date: item.paymentDate,
        //             IsInvoice: false,
        //             customerId: customerId,
        //             IsPayment: true,
        //             debitAmount: 0,
        //             creditAmount: item.amount,
        //         })
        //     }
        // })

        // console.log(balanceSheetArray);
        // return balanceSheetArray;
    }
}
