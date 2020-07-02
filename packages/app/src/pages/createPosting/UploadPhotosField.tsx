import React, { useEffect } from "react";
import { makeStyles, createStyles, Button } from "@material-ui/core";
import { useField } from "formik";
import { PhotoCamera } from "@material-ui/icons";
import UploadedPhotos from "./UploadedPhotos";
import { uploadPhotos } from "../../reducers/photosReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import useUploadPhotosField from "../../hooks/useUploadPhotosField";

interface Props {
  name: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      display: "none",
    },
    button: {
      marginTop: "16px",
      marginBottom: "8px",
    },
  }),
);

export default function UploadPhotosField({ name }: Props): React.ReactElement {
  const classes = useStyles();
  const { handleChange, error, loading } = useUploadPhotosField();

  return (
    <div>
      <div>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          multiple
          name={name}
          onChange={handleChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            className={classes.button}
            fullWidth
            component="span"
            variant="contained"
            color="default"
            startIcon={<PhotoCamera />}
            disabled={loading}
          >
            Upload
          </Button>
        </label>
      </div>
      {error && <div>{error}</div>}
      <UploadedPhotos />
    </div>
  );
}
