import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

import { ChatState } from '../../Context/ChatProvider';
import { IGroup } from '../Chat/ChatDisplay';
import StyledInputAutocomplete from '../StyledInput/StyledInputAutocomplete';
import AccountMenu from './AccountMenu';
import BasicMenu from './BasicMenu';

type IGroupResponse = {
  group: IGroup[];
};

const Navbar = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const { user, setSelectedGroup, selectedGroup } = ChatState();

  /**
   * @description Each time the search input change this function make a get request to the server and retrieve new groups
   * @param event
   */
  const changeSearchHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const { data } = await axios.get<IGroupResponse>(
        `http://localhost:8080/api/v1/group?search=${e.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setGroups(data.group);
      setSearchInput(e.target.value);
    } catch (error: any) {
      console.log(error.response);
    }
  };

  /**
   * @description each time an user select a group this is going to select that group and join the user to that group
   * @param event
   * @param value return a group object
   */
  const changeGroupHandler = async (
    event: React.SyntheticEvent<Element, Event>,
    value: IGroup | null
  ) => {
    console.log(value);
    // if user is not a participant
    if (value) {
      let userInGroup = false;
      value.participants.map((participant) => {
        if (participant._id === user?._id) {
          return (userInGroup = true);
        } else {
          return false;
        }
      });

      if (!userInGroup) {
        try {
          const { data } = await axios.put<IGroup>(
            `http://localhost:8080/api/v1/group/${value?._id}/add`,
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
        setSelectedGroup(value);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={8}
        sx={{
          background: "linear-gradient(to top, #2193b0, #6dd5ed)",
        }}
      >
        <Toolbar>
          <BasicMenu />
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "#fff", display: { xs: "none", sm: "block" } }}
          >
            CHARAP
          </Typography>
          <StyledInputAutocomplete
            placeholder="Search group..."
            options={groups}
            getOptionLabel={(option) => option.name}
            value={searchInput}
            changeHandler={changeSearchHandler}
            changeAutocompleteHandler={changeGroupHandler}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <MailIcon sx={{ color: "#fff" }} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon sx={{ color: "#fff" }} />
              </Badge>
            </IconButton>
          </Box>
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
