import { Dispatch } from "redux";
import photosService from "../services/photosService";

export enum PhotosActionType {
  DELETE_PHOTO = "DELETE_PHOTO",
  ADD_PHOTOS = "ADD_PHOTOS",
  LOAD_PHOTOS = "LOAD_PHOTOS",
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

export type PhotosAction =
  | DeletePhotoAction
  | AddPhotosAction
  | LoadPhotosAction;

export interface PhotosState {
  urls: string[];
  loading: boolean;
}

export const initialState: PhotosState = {
  urls: [],
  loading: false,
};

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
