import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    type: 'varchar',
    collation: 'utf8_general_ci',
    length: 100,
  })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', collation: 'utf8_general_ci', length: 100 })
  firstname: string;

  @Column({ type: 'varchar', collation: 'utf8_general_ci', length: 100 })
  lastname: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  //enable/disable item , active = 1 , disable = 0
  @Column({ width: 1, type: 'tinyint', default: 1 })
  enable: number;
}
