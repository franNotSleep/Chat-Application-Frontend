import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';
import SearchIcon from '@mui/icons-material/Search';
import {
    Avatar,
    Box,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import React, { useState } from 'react';

import { IUser } from './CreateGroup';

type Anchor = "left";
export type Value = 0 | 1 | 2 | 3 | null;

interface IGroupMenuProps {
  currentUser: IUser;
  setValue: React.Dispatch<React.SetStateAction<Value>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const GroupMenu = (props: IGroupMenuProps) => {
  const [openMenu, setOpenMenu] = React.useState(false);
  // this value is going to be used by the GroupNav components for represent

  const clickSetValueHandler = (newVal: Value) => {
    props.setValue(newVal);
    props.setOpen(true);
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenMenu(open);
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250, background: "#6d1b7b", height: 1 / 1 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding onClick={() => clickSetValueHandler(0)}>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar src={props.currentUser.avatar} />
            </ListItemAvatar>
            <ListItemText primary={"Profile"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => clickSetValueHandler(1)}>
          <ListItemButton>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={"Create Group"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => clickSetValueHandler(2)}>
          <ListItemButton>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={"Search Group"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => clickSetValueHandler(3)}>
          <ListItemButton>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary={"My Groups"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {/* Menu for small devices */}
      <Button onClick={toggleDrawer("left", true)}>LEFT</Button>
      <Drawer
        sx={{
          display: { xs: "block", sm: "none" },
        }}
        variant="temporary"
        anchor={"left"}
        open={openMenu}
        elevation={6}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>

      {/* Menu for big devices */}
      <Drawer
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        variant="permanent"
        anchor={"left"}
        open={openMenu}
        elevation={6}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
};

export default GroupMenu;
