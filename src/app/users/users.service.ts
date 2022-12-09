import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { ResponseUserDto, UpdateUserDto } from './dto';
import { UsersRepository } from './infra/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  create(createUserDto: UserDto) {
    return 'This action adds a new user';
  }

  async getUser(id: string): Promise<ResponseUserDto | null> {
    return this.userRepository.getUser(id);
  }

  getUsers() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
