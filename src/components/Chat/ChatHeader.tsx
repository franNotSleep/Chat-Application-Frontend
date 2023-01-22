import { Box, Button, Typography } from '@mui/material';
import React from 'react';

interface IChatHeaderProps {
  groupName: string;
  leaveGroup: () => Promise<void>;
}

const ChatHeader = (props: IChatHeaderProps) => {
  return (
    <Box>
      <Typography variant="h4" component="h2">
        {props.groupName}
      </Typography>

      <Button
        variant="contained"
        color="error"
        onClick={() => props.leaveGroup()}
      >
        Leave Group
      </Button>
    </Box>
  );
};

export default ChatHeader;
