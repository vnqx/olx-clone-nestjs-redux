import { PostingFormFields, Posting } from "./../interfaces";
import Axios from "axios";
import { BASE_URL } from "../common/constants";

async function getAll(): Promise<Posting[]> {
  const { data: postings } = await Axios.get<Posting[]>(`${BASE_URL}/postings`);
  return postings;
}

async function create(input: PostingFormFields): Promise<Posting> {
  const { data: posting } = await Axios.post<Posting>(
    `${BASE_URL}/postings/create`,
    input,
    {
      withCredentials: true,
    },
  );

  return posting;
}

async function getById(id: string): Promise<Posting> {
  const { data: posting } = await Axios.get<Posting>(
    `${BASE_URL}/postings/${id}`,
  );

  return posting;
}

interface FollowPostingData {
  posting: Posting;
  isFollowed: boolean;
}

async function followPosting(id: string): Promise<FollowPostingData> {
  const { data } = await Axios.patch<FollowPostingData>(
    `${BASE_URL}/postings/${id}/follow`,
    {},
    { withCredentials: true },
  );

  return data;
}

async function getAllFollowedPostings(): Promise<Posting[]> {
  const { data: postings } = await Axios.get<Posting[]>(
    `${BASE_URL}/account/followed`,
    { withCredentials: true },
  );

  return postings;
}

async function getAllMyPostings(): Promise<Posting[]> {
  const { data: postings } = await Axios.get<Posting[]>(
    `${BASE_URL}/account/postings`,
    { withCredentials: true },
  );

  return postings;
}

async function remove(id: string): Promise<boolean> {
  const { data: isDeleted } = await Axios.delete<boolean>(
    `${BASE_URL}/postings/${id}`,
    {
      withCredentials: true,
    },
  );

  return isDeleted;
}

async function update(id: string, input: PostingFormFields): Promise<Posting> {
  const { data: updatedPosting } = await Axios.put<Posting>(
    `${BASE_URL}/postings/${id}/edit`,
    input,
    { withCredentials: true },
  );

  return updatedPosting;
}

async function getByTitle(filter: string): Promise<Posting[]> {
  const { data: postings } = await Axios.get<Posting[]>(
    `${BASE_URL}/postings/search/${filter}`,
  );

  return postings;
}

export default {
  getAll,
  create,
  getById,
  followPosting,
  getAllFollowedPostings,
  getAllMyPostings,
  remove,
  update,
  getByTitle,
};
