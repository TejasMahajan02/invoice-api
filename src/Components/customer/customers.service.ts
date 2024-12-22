import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { GenericService } from 'src/Shared/generic.service';
import { CustomerDto } from 'src/dataModels/DTO/customers.dto';
import { Customer } from 'src/dataModels/Schemas/customer.schema';
import { User } from 'src/dataModels/Schemas/user.schema';

@Injectable()
export class CustomerService extends GenericService<CustomerDto, Customer> {
    constructor(@InjectModel(Customer.name) private customerModel: Model<Customer>) {
        super(customerModel)
    }
    async validateCustomerByEmail(email: string) {
        const filterQuery: FilterQuery<Customer> = {
            $and: [{
                isDeleted: false,
                email: email,
            }]
        }

        const customerEntity = await this.findOne(filterQuery);
        if (!customerEntity) throw new NotFoundException('Customer not found.');
        return customerEntity;
    }


    async getOne(id: string): Promise<Customer> {
        const customer = await this.customerModel
            .findById(id)
            .populate('createdUser')  // Populate the related User entity using ObjectId
            .exec();

        return customer;
    }

    async validateCustomerById(id: string) {
        const filterQuery: FilterQuery<Customer> = {
            $and: [{
                isDeleted: false,
                _id : id
            }]
        }

        const customerEntity = await this.findOne(filterQuery);
        if (!customerEntity) throw new NotFoundException('Customer not found.');
        return customerEntity;
    }

    async findOneById(id: string) {
        const filterQuery: FilterQuery<Customer> = {
            $and: [{
                isDeleted: false,
                _id : id
            }]
        }

        return await this.findOne(filterQuery);
    }

    async findOneByEmail(email: string) {
        const filterQuery: FilterQuery<Customer> = {
            $and: [{
                isDeleted: false,
                email
            }]
        }

        return await this.findOne(filterQuery);
    }


    async isCustomerExist(email: string) {
        const filterQuery: FilterQuery<Customer> = {
            $and: [{
                isDeleted: false,
                email: email,
            }]
        };

        const isExist = await this.isExist(filterQuery);
        if (isExist) throw new BadRequestException('Customer already exist.');
    }
}
