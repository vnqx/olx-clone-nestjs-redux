import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { signIn } from "../reducers/meReducer";
import { useNavigate } from "react-router-dom";

export interface SignInFormFields {
  email: string;
  password: string;
}

interface UseSignInForm {
  initialValues: SignInFormFields;
  validationSchema: Yup.ObjectSchema;
  handleSubmit: (input: SignInFormFields) => void;
}

export default function useSignInForm(): UseSignInForm {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues: SignInFormFields = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  function handleSubmit(input: SignInFormFields) {
    dispatch(signIn(input, navigate));
  }

  return { initialValues, validationSchema, handleSubmit };
}
