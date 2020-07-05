import Axios from "axios";
import { BASE_URL } from "../common/constants";

async function uploadPhotos(photos: FileList): Promise<string[]> {
  const formData = new FormData();
  Array.from(photos).forEach((photo) => {
    formData.append("photos", photo);
  });

  const { data: photoUrls } = await Axios.post<string[]>(
    `${BASE_URL}/upload`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return photoUrls;
}

export default { uploadPhotos };
