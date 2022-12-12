import {
  Controller,
  Logger,
  HttpStatus,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  ParseArrayPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { requestContext } from '@fastify/request-context';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ResponseUserDto, UpdateUserDto } from './dto';
import JwtAuthGuard from '../auth/infra/guard';
import { ILoginUser } from 'src/types';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(this.constructor.name);
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-user')
  // getUser(@Query() params: getUserParams): string {
  async getUser(
    @Request() req: Request,
    @Query(
      'id',
      new DefaultValuePipe(1),
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND })
    )
    id: number
  ): Promise<ResponseUserDto | null> {
    const loginUser: ILoginUser = requestContext.get('loginUser');
    this.logger.verbose(`loginUser = ${JSON.stringify(loginUser)}`);
    return this.usersService.getUser(id);
  }

  @Get('get-users')
  getUsers(
    @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]
  ): string[] {
    console.log();
    return ids.map((n) => n.toString());
  }

  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
