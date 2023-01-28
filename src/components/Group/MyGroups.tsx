import GroupsIcon from '@mui/icons-material/Groups';
import { Box, IconButton, Modal, Paper, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { ChatState } from '../../Context/ChatProvider';
import { IGroup, IGroupResponse } from '../Chat/ChatDisplay';

interface IMyGroupsProps {
  open: boolean;
  handleClose(): void;
  submitEffect: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 6 / 10,
  height: "50vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const MyGroups = (props: IMyGroupsProps) => {
  const [myGroups, setMyGroups] = useState<IGroup[]>([]);
  const { user, setSelectedGroup } = ChatState();

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

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box sx={style}>
        {myGroups.map((group) => (
          <Paper
            sx={{
              width: 1 / 1,
              background: "#ebc9bb",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ p: "10px" }}>Name: {group.name}</Typography>
            <Tooltip title="Join">
              <IconButton
                type="button"
                onClick={() => {
                  setSelectedGroup(group);
                  props.submitEffect();
                }}
                sx={{ p: "10px" }}
              >
                <GroupsIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        ))}
      </Box>
    </Modal>
  );
};

export default MyGroups;
