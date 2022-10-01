import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './../../user/entities/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  category: string;

  @Column({ unique: true, type: 'varchar', length: 190 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  tag: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  image: string;

  @Column({ type: 'text' })
  href: string;

  @Column({ nullable: false, type: 'float', default: 0.0 })
  price!: number;

  @Column({ type: 'smallint' })
  stock: number;

  @Column({ type: 'varchar', length: 100 })
  condition: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
