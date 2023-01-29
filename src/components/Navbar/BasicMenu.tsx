import AddIcon from '@mui/icons-material/Add';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import MenuIcon from '@mui/icons-material/Menu';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';

import { ChatState } from '../../Context/ChatProvider';

const BasicMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { setValue } = ChatState();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * @description close the menu and get the value of the list Item
   */
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    const item =
      event.currentTarget.textContent?.split(" ")[2] ??
      event.currentTarget.textContent?.split(" ")[0];
    if (item === "Create") {
      setValue(1);
    } else if (item === "Search") {
      setValue(2);
    } else if (item === "My") {
      setValue(3);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-IconButton"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ mr: 2, color: "#fff" }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-IconButton",
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          Create
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <TravelExploreIcon fontSize="small" />
          </ListItemIcon>
          Search
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Diversity2Icon fontSize="small" />
          </ListItemIcon>
          My Groups
        </MenuItem>
      </Menu>
    </div>
  );
};

export default BasicMenu;
