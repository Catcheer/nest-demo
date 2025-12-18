import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Get('/profile')
  getProfileByUserId(@Query('userId') userId: number) {
    return this.userService.findProfileByUserId(userId);
  }
  @Get('/logs')
  findLogsByUserId(@Query('userId') userId: number) {
    return this.userService.findLogsByUserId(userId);
  }

  @Get('/group-logs')
  async getLogsByGroup(@Query('id') id: number) {
    let res = await this.userService.getLogsByGroup(id);
    // return res.map((log) => ({
    //   result: log.result,
    //   count: log.count,
    // }));
    return res;
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.userService.getById(id);
  }
}
