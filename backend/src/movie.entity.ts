import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  director: string;

  @Column()
  rating: string;

  @Column()
  description: string;

  @Column()
  posterUrl: string;

  @Column()
  imdbUrl: string;
}

