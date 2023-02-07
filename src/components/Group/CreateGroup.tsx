import AddIcon from '@mui/icons-material/Add';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { Box, Button, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { ChatState, IUser } from '../../Context/ChatProvider';
import { IGroup } from '../Chat/ChatDisplay';
import DrawerWrapper from '../DrawerWrapper';
import StyledInput from '../StyledInput/StyledInput';
import ParticipantsField from './ParticipantsField';

interface ICreateGroupProps {
  open: boolean;
  handleClose(): void;
  onSubmitEffect: () => void;
}

interface ICreateGroupData {
  participants: string[];
  name: string;
  admin?: string;
}

const CreateGroup = (props: ICreateGroupProps) => {
  const [input, setInput] = useState<ICreateGroupData>({
    participants: [],
    name: "",
    admin: "",
  });
  const { user, setSelectedGroup } = ChatState();

  const changeAutocompleteHandler = (
    e: React.SyntheticEvent<Element, Event>,
    users: IUser | IGroup | (IUser | IGroup)[] | null
  ) => {
    if (users instanceof Array) {
      users.map((user) => {
        setInput({
          ...input,
          participants: [...input.participants, user._id],
        });
      });
    }
  };

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
    try {
      const requestConfig = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const newGroup = await axios.post<IGroup>(
        "http://localhost:8080/api/v1/group/",
        input,
        requestConfig
      );
      setSelectedGroup(newGroup.data);
      props.onSubmitEffect();
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  return (
    <DrawerWrapper anchor="bottom">
      <Paper
        sx={{
          background: "#70C3FF",
          display: "flex",
          flexWrap: "wrap",
          alignContent: "space-around",
          textAlign: "center",
        }}
        component="form"
        onSubmit={submitHandler}
      >
        <Typography variant="h4" component="p" sx={{ color: "#fff" }}>
          New Group
        </Typography>
        <Box
          sx={{
            width: "90%",
          }}
        >
          <StyledInput
            icon={<Diversity3Icon sx={{ color: "#fff" }} />}
            placeholder="Group Name"
            changeHandler={(e) => {
              setInput({
                ...input,
                name: e.target.value,
              });
            }}
            value={input.name}
          />
          <ParticipantsField
            changeAutocompleteHandler={changeAutocompleteHandler}
          />
        </Box>

        <Button
          variant="contained"
          sx={{
            background: "#fff",
            color: "#70C3FF",
          }}
          type="submit"
          endIcon={<AddIcon />}
        >
          Create
        </Button>
      </Paper>
    </DrawerWrapper>
  );
};

export default CreateGroup;
