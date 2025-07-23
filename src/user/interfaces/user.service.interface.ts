import { User } from '../entities/user.entity';
import { RegisterUserResponseDto } from '@/user/dto/responses/register-user-response.dto';
import { RegisterUserDto } from '@/user/dto/request/register-user.dto';

export interface IUserService {
  register: (dto: RegisterUserDto) => Promise<RegisterUserResponseDto>;
  update: () => Promise<User>;
  delete: () => Promise<void>;
  getData: () => Promise<RegisterUserDto>;
}
