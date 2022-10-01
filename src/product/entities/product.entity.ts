import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 190 })
  name: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', default: null })
  image: string;

  @Column({ type: 'text', default: null })
  document: string;

  @Column({ type: 'blob' })
  note: string;

  @Column({ type: 'int', width: 10 })
  added_by: number;

  @Column({ type: 'int', width: 10 })
  updated_by: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ width: 1, type: 'int', default: 1 })
  enable: number;

  //Default : Disable , Active
  @Column({ length: 10, default: 'Active' })
  status: string;

  // @ManyToOne(() => User, (user) => user.promotion)
  // user: User;
}
