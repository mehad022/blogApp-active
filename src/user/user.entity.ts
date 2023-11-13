// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Blog } from '../blog/blog.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' }) // 'user', 'admin', or 'publisher'
  role: string;

  @OneToMany(() => Blog, (blog) => blog.publisher)
  blogs: Blog[];
}
