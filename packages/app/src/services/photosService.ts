import Axios from "axios";
const baseUrl = "http://localhost:4000/upload";

async function uploadPhotos(photos: FileList): Promise<string[]> {
  const formData = new FormData();
  Array.from(photos).forEach((photo) => {
    formData.append("photos", photo);
  });

  const { data: photoUrls } = await Axios.post(baseUrl, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return photoUrls;
}

export default { uploadPhotos };
