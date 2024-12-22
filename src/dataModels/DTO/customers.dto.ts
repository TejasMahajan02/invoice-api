import { OmitType } from "@nestjs/swagger";
import { UserDto } from "./users.dto";

export class CustomerDto extends OmitType(UserDto, ['password'] as const) {}