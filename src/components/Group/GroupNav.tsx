import { Box } from "@mui/material";
import React, { useState } from "react";

import { ChatState } from "../../Context/ChatProvider";
import Profile from "../Auth/Profile";
import CreateGroup from "./CreateGroup";
import Group from "./Group";
import GroupTabs from "./GroupTabs";
import NewGroup from "./NewGroup";

const GroupNav = () => {
  const { value } = ChatState();

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <GroupTabs />
      {value == 0 && <Group />}
      {value == 1 && <NewGroup />}
      {value == 2 && <CreateGroup />}
      {value == 3 && <Profile />}
    </Box>
  );
};

export default GroupNav;
