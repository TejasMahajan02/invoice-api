import { ApiProperty } from "@nestjs/swagger";

export class PaginatedDto<TData>{
    
    @ApiProperty()
    total:number;

    @ApiProperty()
    limit:number;

    @ApiProperty()
    skip:number;

    @ApiProperty()
    results:TData[];

    @ApiProperty()
    length:number;

}