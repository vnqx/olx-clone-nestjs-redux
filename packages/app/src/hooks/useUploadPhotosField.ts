import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { uploadPhotos } from "../reducers/photosReducer";
import { useField } from "formik";

interface UseUploadPhotosField {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  error: string | false | undefined;
}

export default function useUploadPhotosField(): UseUploadPhotosField {
  const dispatch = useDispatch();
  const { urls, loading } = useSelector((state: RootState) => state.photos);
  const [, { error, touched }, { setValue }] = useField({
    name: "photos",
    type: "file",
  });

  useEffect(() => {
    // update "photos" value of the form
    if (!loading) setValue(urls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls]);

  async function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.validity.valid && target.files?.length)
      dispatch(uploadPhotos(target.files));
  }

  return { handleChange, loading, error: touched && error };
}
