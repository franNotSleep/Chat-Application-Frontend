import './style.css';

import { Box } from '@mui/material';
import Container from '@mui/material/Container/Container';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ChatDisplay from '../components/Chat/ChatDisplay';
import GroupNav from '../components/Group/GroupNav';

const ChatPages = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof localStorage.getItem("user") !== "string") {
      navigate("/");
    }
  });

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          background: "#2cf",
        }}
      >
        <GroupNav />
      </Box>
      <ChatDisplay />
    </Container>
  );
};

export default ChatPages;
