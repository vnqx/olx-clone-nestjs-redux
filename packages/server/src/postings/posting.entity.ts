import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Posting {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  price!: number;

  @Column()
  description!: string;

  @Column()
  phone!: number;

  @Column()
  city!: string;

  @Column({
    array: true,
    type: "text",
  })
  photos!: string[];
}
