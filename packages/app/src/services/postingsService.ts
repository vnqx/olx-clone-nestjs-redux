import { CreatePostingFormFields } from "./../hooks/useCreatePosting";
import Axios from "axios";
import { Posting } from "../types";
const baseUrl = "http://localhost:4000/postings";

export async function getAll(): Promise<Posting[]> {
  const { data: postings } = await Axios.get(baseUrl);
  return postings;
}

export async function create(input: CreatePostingFormFields): Promise<Posting> {
  const { data: posting } = await Axios.post(`${baseUrl}/create`, input, {
    withCredentials: true,
  });

  return posting;
}

export default { getAll, create };
