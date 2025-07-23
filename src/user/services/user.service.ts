import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { BadRequestException, Inject } from '@nestjs/common';
import { IUserService } from '@/user/interfaces/user.service.interface';
import { RegisterUserDto } from '@/user/dto/request/register-user.dto';
import { hash } from 'bcrypt';
import { UserBuilder } from '@/user/builders/user.builder';
import { RegisterUserResponseDto } from '@/user/dto/responses/register-user-response.dto';

export class UserService implements IUserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly repository: IUserRepository,
  ) {}

  async register(dto: RegisterUserDto): Promise<RegisterUserResponseDto> {
    const checkUserName = await this.repository.getData({ phone: dto.phone });

    if (checkUserName) {
      throw new BadRequestException('Telefone já cadastrado');
    }

    const user = await this.repository.register({
      ...dto,
      password: await hash(dto.password, 12),
    });

    return UserBuilder.buildRegisterUserResponse(user);
  }

  update: () => Promise<User>;
  delete: () => Promise<void>;
  getData: () => Promise<RegisterUserDto>;
}
