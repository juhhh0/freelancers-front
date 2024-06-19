import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="h-16 w-full left-0 top-0 px-2 py-4">
      <div className="max-w-4xl mx-auto font-bold text-xl flex gap-2 justify-center">
        <Link to="/">
          <Button>Home</Button>
        </Link>
        {addMenu()}
      </div>
    </nav>
  );
}

const addMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        NEW
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link to={"/new-freelancer"}>
          <MenuItem onClick={handleClose}>Freelance</MenuItem>
        </Link>
        <Link to={"/new-recruiter"}>
          <MenuItem onClick={handleClose}>Recruiter</MenuItem>
        </Link>
      </Menu>
    </div>
  );
};
