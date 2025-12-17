import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.userService.getById(id);
  }
}
