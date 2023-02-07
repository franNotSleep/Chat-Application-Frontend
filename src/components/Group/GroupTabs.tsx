import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Groups2Icon from '@mui/icons-material/Groups2';
import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';

import { ChatState, ComponentValue } from '../../Context/ChatProvider';

const GroupTabs = () => {
  const { setValue, value } = ChatState();

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: ComponentValue
  ) => {

    // value 0 -> <Groups /> component
    // value 1 -> <CreateGroup /> component
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} variant="fullWidth">
      <Tab icon={<Groups2Icon />} label="Groups" />
      <Tab icon={<GroupAddIcon />} label="Create" />
    </Tabs>
  );
};

export default GroupTabs;
