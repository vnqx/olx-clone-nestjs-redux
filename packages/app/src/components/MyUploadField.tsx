import React, { SyntheticEvent } from "react";
import { makeStyles, createStyles, Button } from "@material-ui/core";
import { useField } from "formik";
import { PhotoCamera } from "@material-ui/icons";
import postingsService from "../services/postingsService";

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
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      marginTop: "16px",
      marginBottom: "8px",
    },
    gridList: {
      width: 500,
      height: "auto",
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
    tileBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
        "rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)",
    },
  }),
);

export default function MyUploadField({ name }: Props): React.ReactElement {
  const classes = useStyles();
  const [field] = useField({ name, type: "file" });

  async function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.validity.valid && target.files?.length) {
      const uploadedPhotos = await postingsService.uploadPhotos(target.files);
      console.log(uploadedPhotos);
    }
  }

  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
        multiple
        {...field}
        onChange={onChange}
      />
      <label htmlFor="contained-button-file">
        <Button
          className={classes.button}
          fullWidth
          component="span"
          variant="contained"
          color="default"
          startIcon={<PhotoCamera />}
        >
          Upload
        </Button>
      </label>
    </div>
  );
}
