import './style.css';

import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

import ChatDisplay from '../components/Chat/ChatDisplay';
import GroupNav from '../components/Group/GroupNav';
import Navbar from '../components/Navbar/Navbar';
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
  const { setSelectedGroup } = ChatState();

  const cleanGroup = () => {
    setSelectedGroup(undefined);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <CssBaseline />
        <Navbar />
        <GroupNav />
        <ChatDisplay cleanGroup={cleanGroup} />
      </Box>
    </ThemeProvider>
  );
};

export default ChatPages;
