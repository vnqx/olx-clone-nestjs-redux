import axios from "axios";
import * as Yup from "yup";

interface SignInFormFields {
  email: string;
  password: string;
}

interface UseSignInForm {
  initialValues: SignInFormFields;
  validationSchema: Yup.ObjectSchema;
  handleSubmit: (data: SignInFormFields) => Promise<void>;
}

export default function useSignInForm(): UseSignInForm {
  const initialValues: SignInFormFields = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    // email: Yup.string().email().required(),
    // password: Yup.string()
    //   // .matches(lowercaseRegex, "One lowercase required")
    //   // .matches(uppercaseRegex, "One uppercase required")
    //   // .matches(numericRegex, "One numeric required")
    // .min(2)
    //   .max(50)
    // .required(),
  });

  async function handleSubmit(data: SignInFormFields) {
    const { data: user } = await axios.post(
      "http://localhost:4000/auth/sign-in",
      data,
      {
        withCredentials: true,
      },
    );
  }

  return { initialValues, validationSchema, handleSubmit };
}
