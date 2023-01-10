import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import React, { useState } from 'react';

import { IGroup } from '../Chat/ChatDisplay';
import CreateGroup from './CreateGroup';
import SearchGroup from './SearchGroup';

interface IGroupNavProps {
  onGetGroup(_group: IGroup): void;
}

const GroupNav = (props: IGroupNavProps) => {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [group, setGroup] = React.useState<IGroup>();

  const changeSearchHandler = (
    e: React.SyntheticEvent<Element, Event>,
    value: IGroup
  ) => {
    setGroup(value);
  };

  // This function only reset value, and open to the default value
  const submitEffect = () => {
    setValue(0);
    setOpen(false);
  };

  const searchSubmitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (group) {
      props.onGetGroup(group);
    }
    setOpen(false);
    setValue(0);
  };

  return (
    <Box
      sx={{
        height: 1 / 1,
      }}
    >
      {value == 1 ? (
        <CreateGroup
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
          onGetGroup={props.onGetGroup}
          onSubmitEffect={submitEffect}
        />
      ) : value == 2 ? (
        <SearchGroup
          open={open}
          onSubmitHandler={searchSubmitHandler}
          onChangeSearch={changeSearchHandler}
          handleClose={() => {
            setOpen(false);
          }}
        />
      ) : (
        ""
      )}
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
        <BottomNavigationAction
          label="Search Group"
          icon={<SearchIcon />}
          onClick={() => {
            setOpen(true);
          }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default GroupNav;
