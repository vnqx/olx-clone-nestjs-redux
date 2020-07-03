import { Condition } from "./../enums";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
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

  @Column({ type: "enum", enum: Condition })
  condition!: Condition;

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

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToMany(() => User, (user) => user.followedPostings, { cascade: true })
  @JoinTable()
  followers!: User[];

  @ManyToOne(() => User, (user) => user.myPostings, { cascade: true })
  @JoinColumn()
  user!: User;
}
