// blog.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../blog/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async create(blog: Blog, user: any): Promise<any> {
    const publisher = user?.sub;
    return await this.blogRepository.save({ ...blog, publisher });
  }

  //change satuts from draft to approve
  async approve(id: number) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    blog.status = 'published';
    return await this.blogRepository.save(blog);
  }

  async findAll(): Promise<Blog[]> {
    return await this.blogRepository.find({ where: { status: 'published' } });
  }
}
