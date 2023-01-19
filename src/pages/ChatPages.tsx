import './style.css';

import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ChatDisplay, { IGroup } from '../components/Chat/ChatDisplay';
import GroupNav from '../components/Group/GroupNav';

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
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={2} sm={2} md={1} sx={{}}>
          <GroupNav onGetGroup={getGroup} />
        </Grid>
        <Grid item xs={10} sm={10} md={11}>
          <ChatDisplay cleanGroup={cleanGroup} selectedGroup={group} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ChatPages;
