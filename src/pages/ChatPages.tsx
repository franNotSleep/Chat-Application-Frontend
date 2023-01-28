import './style.css';

import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

import ChatDisplay, { IGroup } from '../components/Chat/ChatDisplay';
import GroupNav from '../components/Group/GroupNav';
import { ChatState } from '../Context/ChatProvider';

const theme = createTheme({
  palette: {
    primary: {
      main: "#70C3FF",
    },
    secondary: {
      main: "#f44336",
    },
  },
  typography: {
    fontFamily: "Outfit",
  },
});

const ChatPages = () => {
  const [group, setGroup] = useState<IGroup>();

  const { setSelectedGroup, selectedGroup } = ChatState();

  const getGroup = (_group: IGroup) => {
    setGroup(_group);
    // setSelectedGroup(_group);
  };

  const cleanGroup = () => {
    setGroup(undefined);
    // setSelectedGroup(undefined);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          background: "#70C3FF",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <CssBaseline />
        <GroupNav />
        <ChatDisplay cleanGroup={cleanGroup} />
      </Box>
    </ThemeProvider>
  );
};

export default ChatPages;
