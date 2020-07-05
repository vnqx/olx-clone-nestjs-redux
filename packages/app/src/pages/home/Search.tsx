import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../reducers/filterReducer";
import { RootState } from "../../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: "1px solid #e2e2e1",
      overflow: "hidden",
      borderRadius: 4,
      backgroundColor: "#fcfcfb",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:hover": {
        backgroundColor: "#fff",
      },
      "&:focus": {
        backgroundColor: "#fff",
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
      // marginBottom: theme.spacing(2),
    },
  }),
);

export default function Search(): React.ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(changeFilter(event.target.value));
  }

  return (
    <TextField
      InputProps={
        { classes, disableUnderline: true } as Partial<OutlinedInputProps>
      }
      label="Search"
      variant="filled"
      fullWidth
      name="search"
      value={filter}
      onChange={handleChange}
    />
  );
}
