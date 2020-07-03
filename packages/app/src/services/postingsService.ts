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

export async function getById(id: string): Promise<Posting> {
  const { data: posting } = await Axios.get(`${baseUrl}/${id}`);

  return posting;
}

interface FollowPostingData {
  posting: Posting;
  isFollowed: boolean;
}

export async function followPosting(id: string): Promise<FollowPostingData> {
  const { data } = await Axios.patch<FollowPostingData>(
    `${baseUrl}/${id}/follow`,
    {},
    { withCredentials: true },
  );

  return data;
}

interface FollowedPostingsData {
  postings: Posting[];
}

export async function getAllFollowedPostings(): Promise<FollowedPostingsData> {
  const { data: postings } = await Axios.get<FollowedPostingsData>(
    `http://localhost:4000/followed`,
    { withCredentials: true },
  );

  return postings;
}

export default {
  getAll,
  create,
  getById,
  followPosting,
  getAllFollowedPostings,
};
