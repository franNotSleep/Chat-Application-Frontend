import "./style.css";

import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";

import ChatDisplay from "../components/Chat/ChatDisplay";
import GroupNav from "../components/Group/GroupNav";
import { ChatState } from "../Context/ChatProvider";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF782D",
    },
    secondary: {
      main: "#E09198",
    },
  },
  typography: {
    fontFamily: "Outfit",
  },
});

const ChatPages = () => {
  const { setSelectedGroup, selectedGroup } = ChatState();
  const [isSelectedGroup, setIsSelectedGroup] = useState(false);

  const cleanGroup = () => {
    setSelectedGroup(undefined);
    setIsSelectedGroup(false);
  };
  useEffect(() => {
    setIsSelectedGroup(selectedGroup ? true : false);
  }, [selectedGroup]);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: { xs: isSelectedGroup ? "none" : "block", md: "block" },
          }}
        >
          <GroupNav />
        </Box>
        <Box
          sx={{
            width: 1 / 1,
            display: { xs: isSelectedGroup ? "block" : "none", md: "block" },
          }}
        >
          <ChatDisplay cleanGroup={cleanGroup} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ChatPages;
