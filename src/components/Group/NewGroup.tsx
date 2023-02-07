import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";

import { ChatState, IGroup, IGroupResponse } from "../../Context/ChatProvider";
import { SearchBox } from "./SearchGroupBar";

const NewGroup = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [search, setSearch] = useState("");
  const [filteredGroups, setFilteredGroups] = useState<IGroup[]>(groups);
  const { user } = ChatState();

  /**
   *
   * @description every time user type makes an API request to the server for groups.
   */
  const changeSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterGroups = groups.filter((group) => {
      return group.name.toUpperCase().includes(e.target.value.toUpperCase());
    });
    setSearch(e.target.value);
    setFilteredGroups(filterGroups);
  };

  // get all groups in first render
  useEffect(() => {
    (async () => {
      const { data } = await axios.get<IGroupResponse>(
        `http://localhost:8080/api/v1/group?search=`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setGroups(data.group);
      setFilteredGroups(data.group);
    })();
  }, []);

  return (
    <Box>
      <SearchBox
        margin="normal"
        fullWidth
        variant="outlined"
        placeholder="New Group"
        inputProps={{ "aria-label": "search" }}
        value={search}
        onChange={changeSearchHandler}
      />
      <Scrollbars style={{ width: "100%", height: 500 }}>
        <List>
          {filteredGroups.map((group) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar src={group?.pic} alt={`${group.name} photo`} />
              </ListItemAvatar>
              <ListItemText primary={group.name} />
            </ListItem>
          ))}
        </List>
      </Scrollbars>
    </Box>
  );
};

export default NewGroup;
