import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import authService from "../services/authService";
import { Me } from "../types";
import { signUp } from "../reducers/authReducer";

export interface SignUpFormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface UseSignUpForm {
  initialValues: SignUpFormFields;
  validationSchema: Yup.ObjectSchema;
  handleSubmit: (input: SignUpFormFields) => void;
}

export default function useSignUpForm(): UseSignUpForm {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues: SignUpFormFields = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(2).max(20),
    lastName: Yup.string().min(2).max(20),
    // email: Yup.string().email().required(),
    // password: Yup.string()
    //   // .matches(lowercaseRegex, "One lowercase required")
    //   // .matches(uppercaseRegex, "One uppercase required")
    //   // .matches(numericRegex, "One numeric required")
    // .min(2)
    //   .max(50)
    // .required(),
    // passwordConfirm: Yup.string()
    //   .oneOf([Yup.ref("password")], "Passwords don't match")
    //   .required(),
  });

  function handleSubmit(input: SignUpFormFields) {
    dispatch(signUp(input, navigate));
    return true;
  }

  return { initialValues, validationSchema, handleSubmit };
}
