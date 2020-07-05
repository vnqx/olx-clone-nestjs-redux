import { PostingFormFields } from "./../interfaces";
import { Condition } from "../enums";

export const postingFormInitialValues: PostingFormFields = {
  title: "",
  price: "",
  condition: Condition.New,
  description: "",
  phone: "",
  city: "",
  photos: [],
};
