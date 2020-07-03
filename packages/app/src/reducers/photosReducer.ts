import { Dispatch } from "redux";
import photosService from "../services/photosService";

export enum PhotosActionType {
  DELETE_PHOTO = "DELETE_PHOTO",
  ADD_PHOTOS = "ADD_PHOTOS",
  LOAD_PHOTOS = "LOAD_PHOTOS",
  MOVE_PHOTO = "MOVE_PHOTO",
}

export interface DeletePhotoAction {
  type: PhotosActionType.DELETE_PHOTO;
  payload: string;
}

export interface AddPhotosAction {
  type: PhotosActionType.ADD_PHOTOS;
  payload: string[];
}

export interface LoadPhotosAction {
  type: PhotosActionType.LOAD_PHOTOS;
  payload: true;
}

export interface MovePhotoAction {
  type: PhotosActionType.MOVE_PHOTO;
  payload: string;
}

export type PhotosAction =
  | DeletePhotoAction
  | AddPhotosAction
  | LoadPhotosAction
  | MovePhotoAction;

export interface PhotosState {
  urls: string[];
  loading: boolean;
}

export const initialState: PhotosState = {
  urls: [],
  loading: false,
};

// helper function - modulo for negative numbers, (-13) % 64 == 51
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function photosReducer(
  state = initialState,
  action: PhotosAction,
): PhotosState {
  switch (action.type) {
    case PhotosActionType.DELETE_PHOTO:
      return {
        ...state,
        urls: state.urls.filter((url) => url !== action.payload),
      };
    case PhotosActionType.ADD_PHOTOS:
      return {
        ...state,
        urls: state.urls.concat(action.payload),
        loading: false,
      };
    case PhotosActionType.LOAD_PHOTOS:
      return { ...state, loading: true };
    case PhotosActionType.MOVE_PHOTO:
      for (let i = 0; i < state.urls.length; i++) {
        // swap two photos
        if (state.urls[i] === action.payload) {
          // if it was state.urls[i], state.urls[i+1] it would've been
          // pushing it forward, needed the mod function so that
          // i-1 for i equal to 0 is state.urls.length-1
          [state.urls[i], state.urls[mod(i - 1, state.urls.length)]] = [
            state.urls[mod(i - 1, state.urls.length)],
            state.urls[i],
          ];
          break;
        }
      }

      return { ...state };
    default:
      return state;
  }
}

export function deletePhoto(url: string) {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch({
      type: PhotosActionType.DELETE_PHOTO,
      payload: url,
    });
  };
}

export function movePhoto(url: string) {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch({
      type: PhotosActionType.MOVE_PHOTO,
      payload: url,
    });
  };
}

export function uploadPhotos(photos: FileList) {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch({ type: PhotosActionType.LOAD_PHOTOS, payload: true });

    const uploadedPhotoUrls = await photosService.uploadPhotos(photos);

    dispatch({
      type: PhotosActionType.ADD_PHOTOS,
      payload: uploadedPhotoUrls,
    });
  };
}

export default photosReducer;
