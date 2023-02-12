import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  AvatarGroup,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { ChatState, IUser } from "../../Context/ChatProvider";
import { IGroup, IGroupResponse } from "../Chat/ChatDisplay";

const DisplayGroup = () => {
  const navigate = useNavigate();
  const {
    user,
    selectedGroup,
    setMyGroups,
    myFilteredGroups,
    setSelectedGroup,
    setValue,
  } = ChatState();

  // Make API request for My Groups
  const getMyGroups = async () => {
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
  /**
   * @description add user to the group.particpants[] in the database
   * @param user
   */
  const joiningGroup = async (user: IUser | undefined, group: IGroup) => {
    if (user) {
      let userInGroup = false;
      group.participants.map((participant) => {
        if (participant._id === user?._id) {
          return (userInGroup = true);
        } else {
          return false;
        }
      });

      // if user is already on the group, joining group...
      // else go to group...
      if (!userInGroup) {
        try {
          const { data } = await axios.put<IGroup>(
            `http://localhost:8080/api/v1/group/${group?._id}/add`,
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
    setValue(0);
  };

  const toUTCDate = (date: string | Date) => {
    return date instanceof Date
      ? date.toLocaleDateString()
      : new Date(date).toLocaleString();
  };

  useEffect(() => {
    getMyGroups();
  }, [selectedGroup, navigate]);
  return (
    <Box
      sx={{
        height: { xs: "500px" },
        overflowY: "auto",
      }}
    >
      {!myFilteredGroups.length && "No Group"}
      <List>
        {myFilteredGroups.map((group) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar src={group?.pic} alt={`${group.name} photo`} />
            </ListItemAvatar>
            <ListItemText
              primary={group.name}
              secondary={
                <Chip
                  icon={<SendIcon />}
                  label="GO"
                  variant="outlined"
                  color="success"
                  onClick={() => {
                    joiningGroup(user, group);
                  }}
                />
              }
            />
            <AvatarGroup max={2}>
              <Avatar
                src={group.admin.avatar}
                alt={`${group.admin.name} photo`}
              />
              {group.participants.map((participant) => (
                <Avatar
                  src={participant.avatar}
                  alt={`${participant.name} photo`}
                />
              ))}
            </AvatarGroup>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DisplayGroup;
