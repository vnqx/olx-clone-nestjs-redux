import { User } from "./../interfaces";
import { SignUpFormFields } from "./../hooks/useSignUpForm";
import { SignInFormFields } from "./../hooks/useSignInForm";
import Axios from "axios";

const baseUrl = "http://localhost:4000/auth";

async function getMe(): Promise<User | ""> {
  try {
    const { data: me } = await Axios.get<User>(baseUrl, {
      withCredentials: true,
    });

    return me;
  } catch {
    return "";
  }
}

async function signIn(input: SignInFormFields): Promise<User> {
  const { data: me } = await Axios.post<User>(`${baseUrl}/sign-in`, input, {
    withCredentials: true,
  });

  return me;
}

async function signUp(input: SignUpFormFields): Promise<User> {
  const { data: me } = await Axios.post<User>(`${baseUrl}/sign-up`, input, {
    withCredentials: true,
  });

  return me;
}

async function signOut(): Promise<void> {
  await Axios.post<"OK">(
    `${baseUrl}/sign-out`,
    {},
    {
      withCredentials: true,
    },
  );
}

export default { getMe, signIn, signUp, signOut };
