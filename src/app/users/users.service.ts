import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import UpdateUserDto from './dto/updateUser.dto';
import { UsersRepository } from './infra/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  create(createUserDto: UserDto) {
    return 'This action adds a new user';
  }

  findUsers() {
    return `This action returns all users`;
  }

  findUser(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
