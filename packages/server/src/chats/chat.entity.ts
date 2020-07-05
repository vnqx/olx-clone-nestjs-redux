import {
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import Posting from "../postings/posting.entity";
import User from "../users/user.entity";
import Message from "../messages/message.entity";

@Entity()
export default class Chat {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Posting, (posting) => posting.chats, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  posting!: Posting;

  @ManyToMany(() => User, (user) => user.chats, { cascade: true })
  @JoinTable()
  users!: User[];

  @OneToMany(() => Message, (message) => message.chat)
  messages!: Message[];
}
