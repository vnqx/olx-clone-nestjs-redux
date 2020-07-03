import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import User from "../users/user.entity";

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

  @ManyToMany(() => User, (user) => user.followedPostings, { cascade: true })
  @JoinTable()
  followers!: User[];
}
