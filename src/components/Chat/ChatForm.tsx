import SendIcon from '@mui/icons-material/Send';
import { Box, Button, TextField } from '@mui/material';
import React from 'react';

const ChatForm = () => {
  return (
    <div>
      <Box
        component="form"
        sx={{
          display: "flex",
          rowGap: "2",
          margin: 2,
        }}
      >
        <TextField fullWidth variant="standard" label="Message" />
        <Button variant="text" endIcon={<SendIcon />}>
          Send
        </Button>
      </Box>
    </div>
  );
};

export default ChatForm;
