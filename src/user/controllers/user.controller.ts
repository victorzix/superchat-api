import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Inject, Post, UsePipes } from '@nestjs/common';
import { RegisterUserDto } from '@/user/dto/request/register-user.dto';
import { HashPasswordPipe } from '@/shared/pipes/hash-password.pipe';
import { IUserService } from '@/user/interfaces/user.service.interface';

@ApiTags('Usuários')
@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: IUserService,
  ) {}

  @UsePipes(HashPasswordPipe)
  @Post()
  async register(@Body() dto: RegisterUserDto) {
    return await this.userService.register(dto);
  }
}
