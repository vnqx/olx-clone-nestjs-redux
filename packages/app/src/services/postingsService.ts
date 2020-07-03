import { CreatePostingFormFields } from "./../hooks/useCreatePosting";
import Axios from "axios";
import { Posting } from "../types";

const baseUrl = "http://localhost:4000/postings";

async function getAll(): Promise<Posting[]> {
  const { data: postings } = await Axios.get(baseUrl);
  return postings;
}

async function create(input: CreatePostingFormFields): Promise<Posting> {
  const { data: posting } = await Axios.post(`${baseUrl}/create`, input, {
    withCredentials: true,
  });

  return posting;
}

async function getById(id: string): Promise<Posting> {
  const { data: posting } = await Axios.get(`${baseUrl}/${id}`);

  return posting;
}

interface FollowPostingData {
  posting: Posting;
  isFollowed: boolean;
}

async function followPosting(id: string): Promise<FollowPostingData> {
  const { data } = await Axios.patch<FollowPostingData>(
    `${baseUrl}/${id}/follow`,
    {},
    { withCredentials: true },
  );

  return data;
}

async function getAllFollowedPostings(): Promise<Posting[]> {
  const { data: postings } = await Axios.get<Posting[]>(
    `http://localhost:4000/account/followed`,
    { withCredentials: true },
  );

  return postings;
}

async function getAllMyPostings(): Promise<Posting[]> {
  const { data: postings } = await Axios.get<Posting[]>(
    "http://localhost:4000/account/postings",
    { withCredentials: true },
  );

  return postings;
}

async function remove(id: string): Promise<boolean> {
  const { data: isDeleted } = await Axios.delete<boolean>(`${baseUrl}/${id}`, {
    withCredentials: true,
  });

  return isDeleted;
}

export default {
  getAll,
  create,
  getById,
  followPosting,
  getAllFollowedPostings,
  getAllMyPostings,
  remove,
};
