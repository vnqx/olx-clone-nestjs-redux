import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from "typeorm";
import Posting from "../postings/posting.entity";

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

  @Column()
  passwordHash!: string;

  @ManyToMany(() => Posting, (posting) => posting.followers)
  followedPostings!: Posting[];

  @OneToMany(() => Posting, (posting) => posting.user)
  myPostings!: Posting[];
}
