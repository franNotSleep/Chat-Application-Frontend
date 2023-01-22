import { Paper } from '@mui/material';
import Lottie from 'lottie-react';
import React from 'react';

import chatAnimation from '../../assets/chatAnimation.json';

const ChatLobbie = () => {
  return (
    <Paper
      elevation={6}
      sx={{
        width: 1 / 2,
        height: 1 / 2,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#fff",
        background:
          "rgb(112,195,255) radial-gradient(circle, rgba(112,195,255,1) 30%, rgba(109,27,123,1) 97%)",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Lottie
        animationData={chatAnimation}
        loop={true}
        style={{
          width: "70px",
          height: "100px",
          margin: "0 auto",
        }}
      />
      No Group Selected
    </Paper>
  );
};

export default ChatLobbie;
