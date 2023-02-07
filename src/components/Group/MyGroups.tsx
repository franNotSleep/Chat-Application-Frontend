import { Avatar, AvatarGroup, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { ChatState, IGroup } from '../../Context/ChatProvider';
import { IGroupResponse } from '../Chat/ChatDisplay';
import DrawerWrapper from '../DrawerWrapper';

interface IMyGroupsProps {
  open: boolean;
  handleClose(): void;
  submitEffect: () => void;
}

const MyGroups = (props: IMyGroupsProps) => {
  const navigate = useNavigate();
  const [myGroups, setMyGroups] = useState<IGroup[]>([]);
  const { user, setSelectedGroup, selectedGroup, setOpenDrawer } = ChatState();

  const toUTCDate = (date: string | Date) => {
    return date instanceof Date
      ? date.toLocaleDateString()
      : new Date(date).toLocaleString();
  };

  const isMemberOrAdmin = (group: IGroup): string => {
    if (group.admin._id === user?._id) return "admin";
    else return "member";
  };

  // get groups by current user
  const getGroups = async () => {
    const { data } = await axios.get<IGroupResponse>(
      `http://localhost:8080/api/v1/user/group?search=`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    setMyGroups(data.group);
  };

  const clickHandler = (group: IGroup) => {
    setSelectedGroup(group);
    setOpenDrawer(false);
  };

  useEffect(() => {
    getGroups();
  }, [selectedGroup, navigate]);

  return (
    <DrawerWrapper>
      <List
        sx={{
          width: "100%",
          bgcolor: "#70C3FF",
          height: "100vh",
          display: "flex",
          flexWrap: "wrap",
          alignContent: "space-between",
        }}
      >
        {myGroups.length == 0 && "No group Selected"}
        {myGroups.map((group) => (
          <React.Fragment>
            <ListItem
              alignItems="flex-start"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  background: `${
                    isMemberOrAdmin(group) == "member" ? "#ffef70" : "#ff3737"
                  }`,
                  transition: "ease",
                  transitionDuration: "0.5s",
                },
                background: `${
                  isMemberOrAdmin(group) == "member" ? "#ece07f" : "#ff8080"
                }`,
                border: `1px solid ${
                  isMemberOrAdmin(group) == "admin" ? "#ece07f" : "#ff8080"
                }`,
                height: "20%",
              }}
              onClick={() => {
                clickHandler(group);
              }}
            >
              <ListItemAvatar>
                <Avatar alt={`${group.name} img`} src={group.pic} />
              </ListItemAvatar>
              <ListItemText
                primary={<PrimaryListItemText group={group} />}
                secondary={
                  <React.Fragment>
                    {`Created at ${
                      group.createdAt && toUTCDate(group.createdAt)
                    }`}
                  </React.Fragment>
                }
              />
              <AvatarGroup max={4}>
                <Avatar
                  alt={`${group.admin.name} img`}
                  src={group.admin.avatar}
                />

                {group.participants.map((user) => (
                  <Avatar
                    key={user._id}
                    alt={`${user.name} img`}
                    src={user.avatar}
                  />
                ))}
              </AvatarGroup>
            </ListItem>

            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </DrawerWrapper>
  );
};

interface PrimaryListItemTextProps {
  group: IGroup;
}

const PrimaryListItemText = ({ group }: PrimaryListItemTextProps) => {
  const { user } = ChatState();
  // Return an string whether user is group admin or group member
  const isMemberOrAdmin = (group: IGroup): string => {
    if (group.admin._id === user?._id) return "admin";
    else return "member";
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        columnGap: "10px",
      }}
    >
      <Typography variant="body1" color="InfoText" component="p">
        {group.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-around",
        }}
      >
        <Chip
          label={isMemberOrAdmin(group)}
          size="small"
          variant="filled"
          color={isMemberOrAdmin(group) == "admin" ? "error" : "warning"}
        />
      </Box>
    </Box>
  );
};

export default MyGroups;
