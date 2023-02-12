import GroupAddIcon from "@mui/icons-material/GroupAdd";
import {
  Avatar,
  AvatarGroup,
  Box,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  ChatState,
  IGroup,
  IGroupResponse,
  IUser,
} from "../../Context/ChatProvider";
import { SearchBox } from "./SearchGroupBar";

const NewGroup = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [search, setSearch] = useState("");
  const [filteredGroups, setFilteredGroups] = useState<IGroup[]>(groups);
  const { user, setSelectedGroup, setValue } = ChatState();

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
      <Box
        sx={{
          height: { xs: "500px" },
          overflowY: "auto",
        }}
      >
        <List>
          {filteredGroups.map((group) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar src={group?.pic} alt={`${group.name} photo`} />
              </ListItemAvatar>
              <ListItemText
                primary={group.name}
                secondary={
                  <Chip
                    icon={<GroupAddIcon />}
                    label="Join"
                    variant="outlined"
                    color="success"
                    onClick={() => {
                      joiningGroup(user, group);
                    }}
                  />
                }
              />

              <AvatarGroup max={4}>
                <Avatar
                  src={group.admin.avatar}
                  alt={`${group.admin.name} photo`}
                />
                {group.participants.map((participant: IUser) => (
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
    </Box>
  );
};

export default NewGroup;
