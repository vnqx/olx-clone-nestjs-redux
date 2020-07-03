import React from "react";
import {
  makeStyles,
  createStyles,
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";
import DeletePhotoButton from "./DeletePhotoButton";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import MovePhotoButtons from "./MovePhotoButtons";

interface Props {
  photoUrls: string[];
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      marginTop: "16px",
      marginBottom: "8px",
    },
    gridList: {
      width: "100%",
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

export default function UploadedPhotos(): React.ReactElement {
  const classes = useStyles();
  const photoUrls = useSelector((state: RootState) => state.photos.urls);

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {photoUrls.map((url) => (
          <GridListTile key={url}>
            <img src={url} alt="your uploaded photo" />
            <GridListTileBar
              className={classes.tileBar}
              actionIcon={
                <>
                  <MovePhotoButtons url={url} />
                  <DeletePhotoButton url={url} />
                </>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
