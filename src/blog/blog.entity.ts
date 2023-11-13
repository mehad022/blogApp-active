// blog.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'draft' })
  status: string;

  @ManyToOne(() => User, (user) => user.blogs, { cascade: true })
  publisher: User;
}
