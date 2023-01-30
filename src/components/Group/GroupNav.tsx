import Box from '@mui/material/Box';
import axios from 'axios';
import React, { useState } from 'react';

import { ChatState } from '../../Context/ChatProvider';
import Profile from '../Auth/Profile';
import { IGroup } from '../Chat/ChatDisplay';
import CreateGroup from './CreateGroup';
import MyGroups from './MyGroups';
import SearchGroup from './SearchGroup';

const GroupNav = () => {
  const [open, setOpen] = React.useState(false);
  const [group, setGroup] = React.useState<IGroup>();
  const { user, setSelectedGroup, value, setValue, setOpenDrawer } =
    ChatState();

  const changeSearchHandler = (
    e: React.SyntheticEvent<Element, Event>,
    group: IGroup
  ) => {
    setGroup(group);
  };

  // This function only reset value, and open to the default value
  const submitEffect = () => {
    setValue(null);
    setOpen(false);
  };

  const searchSubmitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (group) {
      let userInGroup = false;
      group.participants.map((participant) => {
        if (participant._id === user?._id) {
          return (userInGroup = true);
        } else {
          return false;
        }
      });
      // if user is not already in the group, then join group
      // else just return group
      if (!userInGroup) {
        try {
          const { data } = await axios.put<IGroup>(
            `http://localhost:8080/api/v1/group/${group._id}/add`,
            { userId: user?._id },
            {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            }
          );

          setSelectedGroup(data);
        } catch (err: any) {
          console.log(err.response.data);
        }
      } else {
        setSelectedGroup(group);
      }
    }
    setOpenDrawer(false);
    setValue(null);
  };

  return (
    <Box>
      {value == 1 ? (
        <CreateGroup
          open={open}
          handleClose={() => {
            setOpenDrawer(false);
          }}
          onSubmitEffect={submitEffect}
        />
      ) : value == 2 ? (
        <SearchGroup
          open={open}
          onSubmitHandler={searchSubmitHandler}
          onChangeSearch={changeSearchHandler}
          handleClose={() => {
            setOpenDrawer(false);
          }}
        />
      ) : value == 3 ? (
        <MyGroups
          open={open}
          submitEffect={submitEffect}
          handleClose={() => {
            setOpenDrawer(false);
          }}
        />
      ) : value == 0 ? (
        <Profile
          open={open}
          handleClose={() => {
            setOpenDrawer(false);
          }}
        />
      ) : (
        ""
      )}
    </Box>
  );
};

export default GroupNav;
