import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
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
interface IList {
  text: string;
  icon: JSX.Element;
  value: Value;
}

interface IGroupMenuProps {
  currentUser: IUser;
  setValue: React.Dispatch<React.SetStateAction<Value>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  drawerWidth: {
    sm: number;
  };
}

const GroupMenu = (props: IGroupMenuProps) => {
  const [openMenu, setOpenMenu] = React.useState(false);
  // this value is going to be used by the GroupNav components for represent

  const textAndIcon: IList[] = [
    { text: "Create Group", icon: <AddIcon />, value: 1 },
    { text: "Search Group", icon: <SearchIcon />, value: 2 },
    { text: "My Groups", icon: <GroupsIcon />, value: 3 },
  ];

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
      sx={{
        width: { ...props.drawerWidth, xs: 200 },
        background: "#6d1b7b",
        height: 1 / 1,
      }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        sx={{
          color: "#70c3ff",
        }}
      >
        <ListItem disablePadding onClick={() => clickSetValueHandler(0)}>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar src={props.currentUser.avatar} />
            </ListItemAvatar>
            <ListItemText primary={"Profile"} />
          </ListItemButton>
        </ListItem>

        {textAndIcon.map(({ text, icon, value }) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => clickSetValueHandler(value)}
          >
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {/* Menu for small devices */}
      <IconButton
        size="large"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon color="primary" />
      </IconButton>
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
        <CssBaseline />

        {list("left")}
      </Drawer>

      {/* Menu for big devices */}
      <Drawer
        sx={{
          display: { xs: "none", sm: "block" },
          width: props.drawerWidth,
        }}
        variant="permanent"
        anchor={"left"}
        open={openMenu}
        elevation={6}
        onClose={toggleDrawer("left", false)}
      >
        <CssBaseline />

        {list("left")}
      </Drawer>
    </div>
  );
};

export default GroupMenu;
