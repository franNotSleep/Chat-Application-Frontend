import "./style.css";

import { CssBaseline } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";

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
  const { setSelectedGroup } = ChatState();

  const cleanGroup = () => {
    setSelectedGroup(undefined);
  };

  // Notes:
  // Make [][] this structure
  // quit the same as whatsapp
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={4}>
            <GroupNav />
          </Grid>
          <Grid item xs={0} sm={8}>
            <ChatDisplay cleanGroup={cleanGroup} />
          </Grid>
        </Grid>
        <CssBaseline />
        {/* <Navbar /> */}
      </Container>
    </ThemeProvider>
  );
};

export default ChatPages;
