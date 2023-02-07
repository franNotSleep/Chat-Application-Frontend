import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from "react-router";

import { ChatState } from "../../Context/ChatProvider";
import { IGroupResponse } from "../Chat/ChatDisplay";

const DisplayGroup = () => {
  const navigate = useNavigate();
  const { user, selectedGroup, setMyGroups, myFilteredGroups } = ChatState();

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

  const toUTCDate = (date: string | Date) => {
    return date instanceof Date
      ? date.toLocaleDateString()
      : new Date(date).toLocaleString();
  };

  useEffect(() => {
    getMyGroups();
  }, [selectedGroup, navigate]);
  return (
    <Box>
      {!myFilteredGroups.length && "No Group"}
      <Scrollbars style={{ width: "100%", height: 500 }}>
        <List>
          {myFilteredGroups.map((group) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar src={group?.pic} alt={`${group.name} photo`} />
              </ListItemAvatar>
              <ListItemText
                primary={group.name}
                secondary={
                  group.updatedAt
                    ? toUTCDate(group.updatedAt)
                    : toUTCDate(group.createdAt ?? "")
                }
              />
            </ListItem>
          ))}
        </List>
      </Scrollbars>
    </Box>
  );
};

export default DisplayGroup;
