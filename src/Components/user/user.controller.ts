import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ExpressJWTRequest } from '../auth/interfaces/IExpressJwt.request';
import { FilterQuery } from 'mongoose';
import { User } from 'src/dataModels/Schemas/user.schema';
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth('access-token')
export class UserController {
    constructor(private _userServ: UserService) { }

    @Get()
    @UseGuards(AuthGuard)
    async getUserDetails(@Req() req: Response) {
        const userQuery: FilterQuery<User> = {
            $and: [{
                isDeleted: false,
                _id: req['user']._id,
            }]
        }

        return await this._userServ.findOne(userQuery);
    }
}
