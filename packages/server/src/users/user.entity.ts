import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from "typeorm";
import Posting from "../postings/posting.entity";
import Chat from "../chats/chat.entity";

@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

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
