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

interface FollowedPostingsData {
  postings: Posting[];
}

async function getAllFollowedPostings(): Promise<FollowedPostingsData> {
  const { data: postings } = await Axios.get<FollowedPostingsData>(
    `http://localhost:4000/account/followed`,
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
