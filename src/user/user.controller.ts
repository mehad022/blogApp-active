import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { registrationResponse } from './interfaces/registerResponse';
import { AuthService } from 'src/auth/auth.services';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  //register user
  @Post('register')
  async create(@Body() user: User): Promise<registrationResponse> {
    return this.userService.create(user);
  }

  //login user
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.validateUser(email, password);
    return this.authService.generateToken(user);
  }
}
