import { Box } from "@mui/material";
import React from "react";

import DisplayGroup from "./DisplayGroup";
import SearchGroupBar from "./SearchGroupBar";

const Group = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SearchGroupBar />
      <DisplayGroup />
    </Box>
  );
};

export default Group;
