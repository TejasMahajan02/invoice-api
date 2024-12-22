import { IUser } from "src/Interface/Dist/IUser";
import { GenericDto } from "./generic.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsStrongPassword } from "class-validator";
import { Transform } from "class-transformer";


export class UserDto extends GenericDto implements IUser {
    @ApiProperty()
    @IsNotEmpty()
    firstName?: string;

    @ApiProperty()
    @IsNotEmpty()
    lastName?: string;

    @ApiProperty()
    @IsNotEmpty()
    city: string;

    @ApiProperty()
    @IsNotEmpty()
    country: string;

    @ApiProperty()
    @IsNotEmpty()
    state: string;

    @ApiProperty()
    @IsEmail()
    @Transform(({ value }) => value?.toLocaleLowerCase())
    email: string;

    @ApiProperty()
    @IsPhoneNumber('IN')
    phoneNumber: string;

    @ApiProperty()
    @IsStrongPassword()
    password: string;

}