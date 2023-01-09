import { Box } from '@mui/material';
import React from 'react';


interface IMessageProps {
    content: string;
  }
  
  const Message = (props: IMessageProps) => {
    return (
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
        {props.content}
      </Box>
    );
  };

export default Message