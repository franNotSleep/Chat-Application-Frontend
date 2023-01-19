import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
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

  console.log(`Val: ${value}`);
  return (
    <Paper
      elevation={6}
      sx={{
        height: 1 / 1,
      }}
    >
      <GroupMenu
        currentUser={currentUser}
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
      <BottomNavigation
        sx={{
          display: "flex",
          flexDirection: "column",
          height: 1 / 1,
          color: "#fff",
          background: "#6d1b7b",
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Profile"
          icon={<Avatar src={currentUser.avatar} />}
          onClick={() => {
            setOpen(true);
          }}
          sx={{
            color: "#fff",
          }}
        />
        <BottomNavigationAction
          sx={{
            color: "#fff",
          }}
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
          sx={{
            color: "#fff",
          }}
        />
        <BottomNavigationAction
          label="My Groups"
          icon={<GroupsIcon />}
          onClick={() => {
            setOpen(true);
          }}
          sx={{
            color: "#fff",
          }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default GroupNav;
