import { postingFormInitialValues } from "./../common/postingFormManagement";
import { useState } from "react";
import { useEffect } from "react";
import { PostingFormFields } from "./../interfaces";
import { RootState } from "./../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editPosting } from "../reducers/fullPostingReducer";
import { addPhotos } from "../reducers/photosReducer";

interface UseCreatePosting {
  initialValues: PostingFormFields;
  handleSubmit: (input: PostingFormFields) => void;
}

export default function useEditPosting(): UseCreatePosting {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(postingFormInitialValues);
  const posting = useSelector((state: RootState) => state.fullPosting);

  useEffect(() => {
    if (posting) {
      setInitialValues({
        title: posting.title,
        price: String(posting.price),
        condition: posting.condition,
        description: posting.description,
        phone: String(posting.phone),
        city: posting.city,
        photos: posting.photos,
      });
      dispatch(addPhotos(posting.photos));
    }
  }, [posting, dispatch]);

  async function handleSubmit(input: PostingFormFields) {
    // navigate to change the route to the updated posting
    posting && dispatch(editPosting(posting.id, input, navigate));
  }

  return { initialValues, handleSubmit };
}
