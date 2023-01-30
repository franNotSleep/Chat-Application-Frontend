import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

import { ChatState } from '../../Context/ChatProvider';
import DrawerWrapper from '../DrawerWrapper';

interface IProfileProps {
  open: boolean;
  handleClose(): void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

type Anchor = "top" | "left" | "bottom" | "right";

const Profile = (props: IProfileProps) => {
  const { user, openDrawer, setOpenDrawer, randomQuote } = ChatState();

  const generateRandomQuote = async () => {
    const { data } = await axios.get("https://api.quotable.io/random");
    console.log(data);
  };

  /**
   *
   * @param open determine whether open the drawer
   * @description Close the drawer if we tap out of the drawer and when press Shift
   */
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpenDrawer(open);
    };

  return (
    <DrawerWrapper>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt={user?.name} src={user?.avatar} />
          </ListItemAvatar>
        </ListItem>
        <Divider textAlign="left" sx={{ color: "#fff" }}>
          Name
        </Divider>
        <ListItem>
          <ListItemText
            secondary={
              <>
                <Typography component="span" variant="body2">
                  {user?.name}
                </Typography>
              </>
            }
          ></ListItemText>
        </ListItem>
        <Divider textAlign="left" sx={{ color: "#fff" }}>
          Email
        </Divider>
        <ListItem>
          <ListItemText
            secondary={
              <>
                <Typography component="span" variant="body2">
                  {user?.email}
                </Typography>
              </>
            }
          ></ListItemText>
        </ListItem>
        <Divider textAlign="left" sx={{ color: "#fff" }}>
          ID
        </Divider>
        <ListItem>
          <ListItemText
            sx={{ color: "#fff" }}
            secondary={
              <>
                <Typography component="span" variant="body2">
                  {user?._id}
                </Typography>
              </>
            }
          ></ListItemText>
        </ListItem>
        {!user?.aboutMe && (
          <>
            <Divider textAlign="left" sx={{ color: "#fff" }}>
              From {randomQuote?.author} to you
            </Divider>

            <ListItem sx={{ textAlign: "left" }}>
              <ListItemText
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      "{randomQuote?.content}"
                    </Typography>
                    <Divider orientation="vertical" />-{randomQuote?.author}
                  </>
                }
              ></ListItemText>
            </ListItem>
          </>
        )}
      </List>
    </DrawerWrapper>
  );
};

export default Profile;
