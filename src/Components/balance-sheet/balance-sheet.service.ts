import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericService } from 'src/Shared/generic.service';
import { BalanceSheetDto } from 'src/dataModels/DTO/balanceSheet.dto';
import { BalanceSheet } from 'src/dataModels/Schemas/balanceSheet.schema';

@Injectable()
export class BalanceSheetService extends GenericService<BalanceSheetDto, BalanceSheet> {
    constructor(@InjectModel(BalanceSheet.name) private balanceSheetModel: Model<BalanceSheet>) {
        super(balanceSheetModel)
    }

    async getAllEntriesOfCustomer(userId: string, customerId: string) {
        return { userId, customerId }
    }
}
