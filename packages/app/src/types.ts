import { Condition } from "./enums";

export interface Posting {
  id: string;
  title: string;
  price: number;
  condition: Condition;
  description: string;
  phone: number;
  city: string;
  photos: string[];
  updatedAt: Date;
  createdAt: Date;
}

export interface Me {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}
