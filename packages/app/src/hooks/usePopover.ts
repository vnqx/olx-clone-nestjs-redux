import React, { useState } from "react";

interface Props {
  name: string;
}

interface UsePopover {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
  open: boolean;
  id: string | undefined;
  anchorEl: HTMLButtonElement | null;
}

export default function usePopover({ name }: Props): UsePopover {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? name : undefined;
  return { handleClick, handleClose, open, id, anchorEl };
}
