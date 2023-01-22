import Box from '@mui/material/Box';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import Profile from '../Auth/Profile';
import { IGroup } from '../Chat/ChatDisplay';
import CreateGroup, { IUser } from './CreateGroup';
import GroupMenu, { Value } from './GroupMenu';
import MyGroups from './MyGroups';
import SearchGroup from './SearchGroup';

interface IGroupNavProps {
  onGetGroup(_group: IGroup): void;
}

const GroupNav = (props: IGroupNavProps) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState<Value>(null);
  const [open, setOpen] = React.useState(false);
  const [group, setGroup] = React.useState<IGroup>();

  // Determine the drawers width to syncronize with the GroupNav component
  let drawerWidth = {
    sm: 200,
  };

  let token!: string;
  let currentUser!: IUser;

  // If not token, go back to the form component
  try {
    if (JSON.parse(localStorage.getItem("user") || "").token) {
      token = JSON.parse(localStorage.getItem("user") || "").token;
      currentUser = JSON.parse(localStorage.getItem("user") || "");
    } else {
      navigate("/");
      return null;
    }
  } catch (err) {
    navigate("/");
    return null;
  }

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
        if (participant._id === currentUser._id) {
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
            { userId: currentUser._id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          props.onGetGroup(data);
        } catch (err: any) {
          console.log(err.response.data);
        }
      } else {
        props.onGetGroup(group);
      }
    }
    setOpen(false);
    setValue(0);
  };

  return (
    <Box
      sx={{
        height: 1 / 1,
        background: "#6d1b7b",
        width: drawerWidth,
      }}
    >
      <GroupMenu
        currentUser={currentUser}
        drawerWidth={drawerWidth}
        setValue={setValue}
        setOpen={setOpen}
      />
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
      ) : value == 3 ? (
        <MyGroups
          open={open}
          onGetGroup={props.onGetGroup}
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
