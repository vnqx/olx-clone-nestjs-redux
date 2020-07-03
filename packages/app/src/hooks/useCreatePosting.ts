import { PostingFormFields } from "./../interfaces";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPosting } from "../reducers/fullPostingReducer";

interface UseCreatePosting {
  handleSubmit: (input: PostingFormFields) => void;
}

export default function useCreatePosting(): UseCreatePosting {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(input: PostingFormFields) {
    // navigate to change the route to the created posting
    dispatch(createPosting(input, navigate));
  }

  return { handleSubmit };
}
