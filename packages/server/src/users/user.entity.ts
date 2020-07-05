import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from "typeorm";
import Posting from "../postings/posting.entity";
import Chat from "../chats/chat.entity";
import { IsEmail, Length } from "class-validator";

@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @Length(2, 20)
  firstName!: string;

  @Column()
  @Length(2, 20)
  lastName!: string;

  @IsEmail()
  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  passwordHash!: string;

  @ManyToMany(() => Posting, (posting) => posting.followers)
  followedPostings!: Posting[];

  @OneToMany(() => Posting, (posting) => posting.user)
  myPostings!: Posting[];

  @ManyToMany(() => Chat, (chat) => chat.users)
  chats!: Chat[];
}
