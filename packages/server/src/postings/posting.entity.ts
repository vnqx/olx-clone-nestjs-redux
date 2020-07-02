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
  mainImage!: string;

  @Column("text", { array: true })
  otherImages!: string[];
}
