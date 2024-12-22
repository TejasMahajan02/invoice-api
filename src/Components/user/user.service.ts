import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { GenericService } from 'src/Shared/generic.service';
import { UserDto } from 'src/dataModels/DTO/users.dto';
import { User } from 'src/dataModels/Schemas/user.schema';

@Injectable()
export class UserService extends GenericService<UserDto, User> {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {
        super(userModel);
    }

    async validateUserByEmail(email: string) {
        const filterQuery: FilterQuery<User> = {
            $and: [{
                isDeleted: false,
                email: email,
            }]
        }

        const userEntity = await this.findOne(filterQuery);
        if (!userEntity) throw new NotFoundException('User not found.');
        return userEntity;
    }

    async validateUserById(id: string) {
        const filterQuery: FilterQuery<User> = {
            $and: [{
                isDeleted: false,
                _id : id
            }]
        }

        const userEntity = await this.findOne(filterQuery);
        if (!userEntity) throw new NotFoundException('User not found.');
        return userEntity;
    }

    async findOneById(id: string) {
        const filterQuery: FilterQuery<User> = {
            $and: [{
                isDeleted: false,
                _id : id
            }]
        }

        return await this.findOne(filterQuery);
    }


    async isUserExist(email: string) {
        const filterQuery: FilterQuery<User> = {
            $and: [{
                isDeleted: false,
                email: email,
            }]
        };

        const isExist = await this.isExist(filterQuery);
        if (isExist) throw new BadRequestException('User already exist.');
    }
}
