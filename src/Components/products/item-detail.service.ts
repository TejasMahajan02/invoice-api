import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { GenericService } from 'src/Shared/generic.service';
import { Invoice } from 'src/dataModels/Schemas/invoiceSchema';
import { ItemDetail } from 'src/dataModels/Schemas/itemDetail.schema';

@Injectable()
export class ItemDetailService extends GenericService<ItemDetail, ItemDetail> {
    constructor(
        @InjectModel(ItemDetail.name) private itemDetailModel: Model<ItemDetail>,
    ) {
        super(itemDetailModel);
    }

    async findByIds(ids: string[]): Promise<ItemDetail[]> {
        // Using the `IN` query operator to fetch ItemDetail documents where their `_id` matches any of the provided `ids`
        return this.itemDetailModel.find({ _id: { $in: ids } }).exec();
    }
    
}

