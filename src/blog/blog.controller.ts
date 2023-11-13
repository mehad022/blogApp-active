// blog.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from '../blog/blog.entity';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/authorization.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Roles(Role.Publisher || Role.User)
  @Post('/create')
  async create(@Body() blog: Blog, @Request() req): Promise<Blog> {
    return this.blogService.create(blog, req.user);
  }

  @Roles(Role.Admin)
  @Get('/approve/:id')
  async approve(@Param('id') id: number) {
    return this.blogService.approve(id);
  }

  @Roles(Role.User || Role.Publisher || Role.Admin)
  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }
}
