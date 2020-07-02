import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { createPosting } from "../reducers/postingsReducer";

export interface CreatePostingFormFields {
  title: string;
  price: string;
  description: string;
  phone: string;
  city: string;
  photos: string[];
}

interface UseCreatePosting {
  initialValues: CreatePostingFormFields;
  validationSchema: Yup.ObjectSchema;
  handleSubmit: (input: CreatePostingFormFields) => void;
}

export default function useCreatePosting(): UseCreatePosting {
  const dispatch = useDispatch();
  const initialValues: CreatePostingFormFields = {
    title: "",
    price: "",
    description: "",
    phone: "",
    city: "",
    photos: [],
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(4),
    //   .max(15, maxMessage(15))
    //   .required(requiredMessage),
    // category: Yup.string()
    //   .oneOf(CATEGORIES, invalidMessage("category"))
    //   .required(requiredMessage),
    // description: Yup.string()
    //   .min(10, minMessage(10))
    //   .max(250, maxMessage(250))
    //   .required(requiredMessage),
    // price: Yup.number()
    //   .positive(invalidMessage("price"))
    //   .integer(invalidMessage("price"))
    //   .required(requiredMessage),
    // condition: Yup.string()
    //   .oneOf(CONDITIONS, invalidMessage("condition"))
    //   .required(requiredMessage),
    // phone: Yup.number()
    //   .positive(invalidMessage("phone number"))
    //   .integer(invalidMessage("phone number"))
    //   .required(requiredMessage),
    // urls: Yup.array()
    //   .of(Yup.string())
    //   .min(1, "Minimum 1 photo allowed")
    //   .max(2, "Maximum 2 photos allowed")
    //   .required(requiredMessage),
    // city: Yup.string()
    //   .min(2, minMessage(2))
    //   .max(15, maxMessage(15))
    //   .required(requiredMessage),
  });

  function handleSubmit(input: CreatePostingFormFields) {
    dispatch(createPosting(input));
  }

  return { initialValues, validationSchema, handleSubmit };
}
