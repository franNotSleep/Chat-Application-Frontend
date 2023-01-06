import { Box } from '@mui/material';
import React from 'react';

const ChatDisplay = () => {
  return (
    <Box
      sx={{
        background: "red",
        height: "70vh",
        margin: "0 auto",
        width: 1 / 1,
      }}
    >
      <Box
        sx={{
          width: 20,
          height: 20,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      />
      <Box
        sx={{
          width: 20,
          height: 20,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      />
    </Box>
  );
};

export default ChatDisplay;
