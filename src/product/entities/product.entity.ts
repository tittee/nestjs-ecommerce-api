import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  // ManyToOne,
} from 'typeorm';

export enum Tag {
  NEW = 'เหมือนใหม่',
  MIDDLE = 'ปานกลาง',
  GOOD = 'สภาพดี',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

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

  // @ManyToOne(() => User, (user) => user.promotion)
  // user: User;
}
