import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class Posting {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  price!: number;
}

export default Posting;
