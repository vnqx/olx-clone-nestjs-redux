import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  IconButton,
  Popover,
  Typography,
} from "@material-ui/core";
import usePopover from "../../hooks/usePopover";
import PhoneIcon from "@material-ui/icons/Phone";

interface Props {
  phone: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
  }),
);

export default function PhonePopover({ phone }: Props): React.ReactElement {
  const classes = useStyles();
  const { id, open, handleClick, handleClose, anchorEl } = usePopover({
    name: 'phone"',
  });

  return (
    <div>
      <IconButton onClick={handleClick} aria-label="see the phone number">
        <PhoneIcon fontSize="large" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>{phone}</Typography>
      </Popover>
    </div>
  );
}
