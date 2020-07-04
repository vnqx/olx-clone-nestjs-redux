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

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export interface Chat {
  id: string;
  users: User[];
  posting: Posting;
  messages: Message[];
}

export interface Message {
  id: string;
  content: string;
  user: User;
  chat: Chat;
}
