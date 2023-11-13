// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRETKEY,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  providers: [UserService, AuthService],
  controllers: [UserController],
})
export class UserModule {}
