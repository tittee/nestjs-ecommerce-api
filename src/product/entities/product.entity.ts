import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './../../user/entities/user.entity';

export enum Tag {
  NEW = 'เหมือนใหม่',
  MIDDLE = 'ปานกลาง',
  GOOD = 'สภาพดี',
}

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

  @Column({ unique: true, type: 'varchar', length: 190 })
  name: string;

  @Column({ type: 'text', collation: 'utf8_general_ci', default: null })
  category: string;

  @Column({
    type: 'enum',
    enum: Tag,
    nullable: false,
    default: Tag.GOOD,
  })
  tag: string;

  @Column({ type: 'text', collation: 'utf8_general_ci' })
  description: string;

  @Column({ type: 'text', collation: 'utf8_general_ci' })
  image: string;

  @Column({ type: 'text', collation: 'utf8_general_ci', default: null })
  href: string;

  @Column({ type: 'decimal', collation: 'utf8_general_ci', width: 20 })
  price: number;

  @Column({ width: 5, type: 'tinyint', default: 1 })
  stock: number;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  updatedDate: Date;

}
