import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Posting {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

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

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt!: Date;
}
