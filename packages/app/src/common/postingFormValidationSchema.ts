import * as Yup from "yup";
import { Condition } from "../enums";

export const postingFormValidationSchema = Yup.object().shape({
  title: Yup.string().min(4).max(15).required(),
  description: Yup.string().min(10).max(500).required(),
  price: Yup.number().positive().integer().required(),
  condition: Yup.string().oneOf([Condition.New, Condition.Used]).required(),
  phone: Yup.number().positive().integer().required(),
  photos: Yup.array()
    .of(Yup.string())
    .min(1, "Minimum 1 photo allowed")
    .max(4, "Maximum 4 photos allowed"),
  city: Yup.string().min(2).max(15).required(),
});
