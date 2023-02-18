import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";

import { ChatState } from "../../Context/ChatProvider";

interface IChatHeaderProps {
  groupName: string;
  leaveGroup: () => Promise<void>;
}
/**
 *
 * @Nota  Make a navbar: in the it's going to be name and avatar and to the left menu(go back, leave group)
 */
const ChatHeader = (props: IChatHeaderProps) => {
  const { selectedGroup } = ChatState();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ background: "#E1E1E1" }}>
          <Avatar src={selectedGroup?.pic} alt={`${selectedGroup?.name} pic`} />
          <Typography
            variant="subtitle1"
            component="p"
            sx={{ flexGrow: 1, ml: 2 }}
          >
            {selectedGroup?.name}
          </Typography>
          <BasicMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { setSelectedGroup, selectedGroup, user } = ChatState();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goBack = () => {
    setSelectedGroup(undefined);
  };

  // Leave group: Make an api request to the server to eliminate the current group for user's group
  const leavingGroup = async () => {
    try {
      // leaving group
      if (user?._id === selectedGroup?.admin._id) {
        // send an alert
        return;
      }
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/group/${selectedGroup?._id}/leave`,
        { userId: user?._id },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setSelectedGroup(undefined);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        aria-controls={open ? "basic-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => goBack()}>Go Back</MenuItem>
        <MenuItem onClick={() => leavingGroup()}>Exit Group</MenuItem>
      </Menu>
    </div>
  );
}

export default ChatHeader;
