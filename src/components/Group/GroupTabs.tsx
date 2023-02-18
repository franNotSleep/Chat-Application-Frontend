import { AccountBox } from "@mui/icons-material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Groups2Icon from "@mui/icons-material/Groups2";
import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

import { ChatState, ComponentValue } from "../../Context/ChatProvider";

const GroupTabs = () => {
  const { setValue, value } = ChatState();

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: ComponentValue
  ) => {
    // value 0 -> <Groups /> component
    // value 1 -> <NewGroup /> component
    // value 2 -> <CreateGroup /> component
    // value 3 -> <Profile /> component
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        overflow: "auto",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        sx={{
          borderRight: 1,
          borderColor: "divider",
        }}
        centered
      >
        <Tab icon={<Groups2Icon />} label="Groups" />
        <Tab icon={<GroupAddIcon />} label="Search Group" />
        <Tab icon={<GroupAddIcon />} label="Create Group" />
        <Tab icon={<AccountBox />} label="Profile" />
      </Tabs>
    </Box>
  );
};

export default GroupTabs;
