import Box from '@mui/material/Box';
import axios from 'axios';
import React, { useState } from 'react';

import { ChatState } from '../../Context/ChatProvider';
import Profile from '../Auth/Profile';
import { IGroup } from '../Chat/ChatDisplay';
import CreateGroup from './CreateGroup';
import GroupMenu, { Value } from './GroupMenu';
import MyGroups from './MyGroups';
import SearchGroup from './SearchGroup';

const GroupNav = () => {
  const [value, setValue] = React.useState<Value>(null);
  const [open, setOpen] = React.useState(false);
  const [group, setGroup] = React.useState<IGroup>();
  const { user, setSelectedGroup, selectedGroup } = ChatState();

  // Determine the drawers width to syncronize with the GroupNav component
  let drawerWidth = {
    sm: 200,
  };

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
    setOpen(false);
    setValue(0);
  };

  return (
    <Box
      sx={{
        height: 1 / 1,
        background: "#70C3FF",
        margin: 0,
        alignSelf: "flex-start",
        border: "1px solid red",
      }}
    >
      {user && (
        <GroupMenu
          currentUser={user}
          drawerWidth={drawerWidth}
          setValue={setValue}
          setOpen={setOpen}
        />
      )}

      {value == 1 ? (
        <CreateGroup
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
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
      ) : value == 3 ? (
        <MyGroups
          open={open}
          submitEffect={submitEffect}
          handleClose={() => {
            setOpen(false);
          }}
        />
      ) : value == 0 ? (
        <Profile
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
        />
      ) : (
        ""
      )}
    </Box>
  );
};

export default GroupNav;
