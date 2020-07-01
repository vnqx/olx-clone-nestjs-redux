import { SignUpFormFields } from "./../hooks/useSignUpForm";
import { SignInFormFields } from "./../hooks/useSignInForm";
import { Me } from "../types";
import Axios from "axios";

const baseUrl = "http://localhost:4000/auth";

async function getMe(): Promise<Me> {
  const { data: me } = await Axios.get(baseUrl, { withCredentials: true });
  return me;
}

async function signIn(input: SignInFormFields): Promise<Me> {
  const { data: me } = await Axios.post(`${baseUrl}/sign-in`, input, {
    withCredentials: true,
  });

  return me;
}

async function signUp(input: SignUpFormFields): Promise<Me> {
  const { data: me } = await Axios.post(`${baseUrl}/sign-up`, input, {
    withCredentials: true,
  });

  return me;
}

async function signOut(): Promise<void> {
  await Axios.post(
    `${baseUrl}/sign-out`,
    {},
    {
      withCredentials: true,
    },
  );
}

export default { getMe, signIn, signUp, signOut };
