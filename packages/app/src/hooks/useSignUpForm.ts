import * as Yup from "yup";

interface SignUpFormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function useSignUpForm() {
  const initialValues: SignUpFormFields = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const lowercaseRegex = /(?=.*[a-z])/;
  const uppercaseRegex = /(?=.*[A-Z])/;
  const numericRegex = /(?=.*[0-9])/;

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

  function handleSubmit() {
    console.log("ddd");
  }

  return { initialValues, validationSchema, handleSubmit };
}
