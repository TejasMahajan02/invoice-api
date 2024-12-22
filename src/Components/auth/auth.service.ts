import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FilterQuery } from 'mongoose';
import { UserService } from '../user/user.service';
import { AuthLoginDto } from 'src/dataModels/DTO/auth.login.dto';
import { User } from 'src/dataModels/Schemas/user.schema';
import { IPayload } from 'src/Shared/Ipayload';
import { JwtService } from '@nestjs/jwt';
import { v4 } from 'uuid';
import { UserDto } from 'src/dataModels/DTO/users.dto';
import { GenericSchema } from 'src/dataModels/Schemas/generic.schema';

@Injectable()
export class AuthService {
    constructor(
        private _userServ: UserService,
        private _jwtService: JwtService
    ) { }

    validateToken(token: string) {
        return this._jwtService.verify(token, {
            secret: process.env.JWT_SECRET_KEY
        }) as IPayload;
    }

    async login(authLoginDto: AuthLoginDto) {
        // validate user existance
        const userEntity = await this._userServ.validateUserByEmail(authLoginDto.email);

        // validate user password
        const isPasswordMatch = await bcrypt.compare(authLoginDto.password, userEntity.password);
        if (!isPasswordMatch) throw new BadRequestException('Incorrect password');

        const payload = { id: userEntity._id };

        return {
            access_token: this._jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY }),
            payload: payload
        }
    }

    async create(userDto: UserDto): Promise<GenericSchema> {
        // validate user existance
        await this._userServ.isUserExist(userDto.email);

        const hashedPassword = await bcrypt.hash(userDto.password, 12);
        userDto.password = hashedPassword;
        // userDto.uuid = v4();
        // userDto.createdUser = userDto.uuid;
        return this._userServ.create(userDto);
    }
}
