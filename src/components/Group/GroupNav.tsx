import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import React, { useState } from 'react';

import CreateGroup from './CreateGroup';

const GroupNav = () => {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  return (
    <Box
      sx={{
        height: 1 / 1,
      }}
    >
      <CreateGroup
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
      <BottomNavigation
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "red",
          height: 1 / 1,
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
        <BottomNavigationAction
          label="Create Group"
          icon={<AddIcon />}
          onClick={() => {
            setOpen(true);
          }}
        />
        <BottomNavigationAction label="Search Group" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default GroupNav;
