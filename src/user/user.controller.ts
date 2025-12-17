import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interface/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.userService.getById(id);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }
  @Post('/create')
  create(@Body() user: User) {
    console.log('user', user);
    return this.userService.create(user);
  }

  @Post('/update/:id')
  update(@Param('id') id: number, @Body() user: User) {
    return this.userService.update(id, user);
  }

  @Post('/delete/:id')
  delete(@Param('id') id: number): Promise<any> {
    return this.userService.delete(id);
  }
}
