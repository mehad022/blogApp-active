// user.service.ts
import {
  Body,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.services';
import { registrationResponse } from './interfaces/registerResponse';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  //user registration
  async create(@Body() user: User): Promise<registrationResponse> {
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const createdUser = await this.userRepository.save(user);
    const token = await this.authService.generateToken(createdUser);

    return { access_token: token.access_token, user: createdUser };
  }

  //for user validation/login
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Email not found');
    }

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
