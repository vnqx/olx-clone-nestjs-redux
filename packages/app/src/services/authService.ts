import { Me } from "../types";
import Axios from "axios";

const baseUrl = "http://localhost:4000/auth";

async function getMe(): Promise<Me> {
  const { data: me } = await Axios.get(baseUrl, { withCredentials: true });
  return me;
}

export default { getMe };
