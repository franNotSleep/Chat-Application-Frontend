import './style.css';

import { Box } from '@mui/material';
import Container from '@mui/material/Container/Container';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ChatDisplay, { IGroup } from '../components/Chat/ChatDisplay';
import GroupNav from '../components/Group/GroupNav';

const ChatPages = () => {
  const navigate = useNavigate();
  const [group, setGroup] = useState<IGroup>();

  const getGroup = (_group: IGroup) => {
    setGroup(_group);
  };

  const cleanGroup = () => {
    setGroup(undefined);
  };

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
        <GroupNav onGetGroup={getGroup} />
      </Box>
      <ChatDisplay cleanGroup={cleanGroup} selectedGroup={group} />
    </Container>
  );
};

export default ChatPages;
