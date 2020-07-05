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
  OneToMany,
} from "typeorm";
import User from "../users/user.entity";
import Chat from "../chats/chat.entity";
import { IsNumber, IsPositive, IsString, Length } from "class-validator";

@Entity()
export default class Posting {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @IsString()
  @Length(2, 15)
  title!: string;

  @Column()
  @IsNumber()
  @IsPositive()
  price!: number;

  @Column({ type: "enum", enum: Condition })
  condition!: Condition;

  @Column()
  @IsString()
  @Length(10, 500)
  description!: string;

  @Column()
  @IsNumber()
  @Length(2, 20)
  phone!: number;

  @Column()
  @Length(2, 15)
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

  @OneToMany(() => Chat, (chat) => chat.posting)
  chats!: Chat[];
}
