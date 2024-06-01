import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  sessionKey: string;

  @Column()
  createdAt: Date;
}

