import { Condition } from "./../../enums";

export class CreatePostingDto {
  title!: string;
  price!: number;
  condition!: Condition;
  description!: string;
  phone!: number;
  city!: string;
  photos!: string[];
}
