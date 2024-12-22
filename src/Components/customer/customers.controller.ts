import { BadRequestException, Body, Controller, Delete, Get, MiddlewareConsumer, NotFoundException, Param, Post, Put, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CustomerService } from './customers.service';
import { CustomerDto } from 'src/dataModels/DTO/customers.dto';
import { Customer } from 'src/dataModels/Schemas/customer.schema';
import { GenericSchema } from 'src/dataModels/Schemas/generic.schema';
import { PaginationParams } from 'src/dataModels/DTO/pagination.params.dto';
import { FilterQuery } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { GridFSBucket, MongoClient } from 'mongodb';
import { Response } from 'express';
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { ExpressJWTRequest } from '../auth/interfaces/IExpressJwt.request';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from "express";
import { UserService } from '../user/user.service';
import { HttpResponseDto } from 'src/Shared/dtos/http-response.dto';

@Controller('customer')
@ApiTags('Customer')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
export class CustomerController {
  constructor(private _customerServ: CustomerService, private _userService: UserService) { }

  @Post()
  async create(@Req() req: Request, @Body() createDto: CustomerDto): Promise<GenericSchema | Customer> {
    const loggedInUser = req['user'];

    const customerEntity = await this._customerServ.findOneByEmail(createDto.email);
    if (customerEntity && customerEntity?.email === loggedInUser.email) throw new BadRequestException('You cannot create yourself as customer.');
    if (customerEntity && customerEntity?.email !== loggedInUser.email) throw new BadRequestException('Customer already exist.');

    createDto.createdUser = loggedInUser._id;
    return await this._customerServ.create(createDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer> {
    return await this._customerServ.validateCustomerById(id);
  }

  @Get()
  async findAll(@Req() req: Request, @Query() { skip, limit }: PaginationParams) {
    const loggedInUser = req['user'];

    const query: FilterQuery<CustomerDto> = {
      isDeleted: false,
      createdUser: loggedInUser._id
    }

    return await this._customerServ.findAll(query, { skip, limit });
  }


  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() userDto: Partial<CustomerDto>) {
    const query: FilterQuery<CustomerDto> = {
      isDeleted: false,
      _id: id
    }
    const customerEntity = await this._customerServ.update(query, userDto);
    if (!customerEntity) throw new NotFoundException('Customer not exist.');

    return customerEntity;
  }


  @Delete(':id')
  async deleteOne(@Req() req: Request, @Param('id') id: string) {
    const loggedInUser = req['user'];

    const deletedCustomer = await this._customerServ.delete({ _id: id, isDeleted: false }, loggedInUser._id);
    if (!deletedCustomer) throw new NotFoundException('Customer not exist.');

    return new HttpResponseDto('Customer deleted successfully.');
  }

  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'File uploaded successfully',
      fileUrl: `http://localhost:3000/api/upload/${file.filename}`,
    };
  }

  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const client = new MongoClient('mongodb://localhost/nest');
    await client.connect();
    const database = client.db('nest');
    const bucket = new GridFSBucket(database, { bucketName: 'uploads' });
    const downloadStream = bucket.openDownloadStreamByName(filename);

    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });

    downloadStream.on('error', () => {
      res.sendStatus(404);
    });

    downloadStream.on('end', () => {
      res.end();
    });
  }
}
