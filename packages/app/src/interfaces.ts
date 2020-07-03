import { Condition } from "./enums";

export interface PostingFormFields {
  title: string;
  price: string;
  condition: Condition;
  description: string;
  phone: string;
  city: string;
  photos: string[];
}
