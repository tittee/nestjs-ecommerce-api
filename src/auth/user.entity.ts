import { Product } from '../products/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  firstname: string;

  @Column({ default: null })
  lastname: string;

  @OneToMany((_type) => Product, (task) => task.user, { eager: true })
  products: Product[];
}
