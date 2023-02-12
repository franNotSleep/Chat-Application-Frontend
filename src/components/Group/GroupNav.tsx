import Box from '@mui/material/Box';
import axios from 'axios';
import React, { useState } from 'react';

import { ChatState } from '../../Context/ChatProvider';
import { IGroup } from '../Chat/ChatDisplay';
import CreateGroup from './CreateGroup';
import Group from './Group';
import GroupTabs from './GroupTabs';
import NewGroup from './NewGroup';

const GroupNav = () => {
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
    <Box
      sx={{
        height: "100%",
      }}
    >
      <GroupTabs />
      {value == 0 && <Group />}
      {value == 1 && <NewGroup />}
      {value == 2 && <CreateGroup />}
      {/* {value == 1 ? (
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
      )} */}
    </Box>
  );
};

export default GroupNav;
