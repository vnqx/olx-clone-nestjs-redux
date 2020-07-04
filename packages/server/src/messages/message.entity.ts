import {
  ManyToOne,
  JoinColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import Chat from "../chats/chat.entity";
import User from "../users/user.entity";

@Entity()
export default class Message {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Chat, (chat) => chat.messages, { cascade: true })
  @JoinColumn()
  chat!: Chat;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  user!: User;

  @Column()
  content!: string;
}
