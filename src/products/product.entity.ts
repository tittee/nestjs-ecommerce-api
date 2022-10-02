import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductTag } from './product-tag.enum';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', width: 120 })
  slug: string;

  @Column({ type: 'decimal', width: 20 })
  price: number;

  @Column()
  tag: ProductTag;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne((_type) => User, (user) => user.products, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
