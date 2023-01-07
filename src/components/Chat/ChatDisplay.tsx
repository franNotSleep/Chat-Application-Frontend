import { Box } from '@mui/material';
import React from 'react';

const ChatDisplay = () => {
  return (
    <Box
      sx={{
        height: "70vh",
        margin: "0 auto",
        width: 1 / 1,
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "max-content",
          height: 20,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        Hola
      </Box>
      <Box
        sx={{
          width: "max-content",

          height: 20,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
          alignItems: "flex-end",
          position: "absolute",
          right: "0px",
        }}
      >
        Hola
      </Box>
    </Box>
  );
};

export default ChatDisplay;
