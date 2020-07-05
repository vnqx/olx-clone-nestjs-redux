import { User } from "./../interfaces";
import { SignUpFormFields } from "./../hooks/useSignUpForm";
import { SignInFormFields } from "./../hooks/useSignInForm";
import Axios from "axios";
import { BASE_URL } from "../common/constants";

async function getMe(): Promise<User> {
  const { data: me } = await Axios.get<User>(`${BASE_URL}/auth`, {
    withCredentials: true,
  });

  return me;
}

async function signIn(input: SignInFormFields): Promise<User> {
  const { data: me } = await Axios.post<User>(
    `${BASE_URL}/auth/sign-in`,
    input,
    {
      withCredentials: true,
    },
  );

  return me;
}

async function signUp(input: SignUpFormFields): Promise<User> {
  const { data: me } = await Axios.post<User>(
    `${BASE_URL}/auth/sign-up`,
    input,
    {
      withCredentials: true,
    },
  );

  return me;
}

async function signOut(): Promise<void> {
  await Axios.post<"OK">(
    `${BASE_URL}/auth/sign-out`,
    {},
    {
      withCredentials: true,
    },
  );
}

export default { getMe, signIn, signUp, signOut };
