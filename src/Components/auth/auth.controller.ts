import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from 'src/dataModels/DTO/auth.login.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/dataModels/DTO/users.dto';
import { GenericSchema } from 'src/dataModels/Schemas/generic.schema';

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return await this.authService.login(authLoginDto);
  }

  @Post('register')
  async register(@Body() userDto: UserDto): Promise<GenericSchema> {
    const result = await this.authService.create(userDto);
    delete result['password'];
    return result
  }

}
