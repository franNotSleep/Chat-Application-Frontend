import AddIcon from '@mui/icons-material/Add';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete, Checkbox, Fab, Modal, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { ChatState } from '../../Context/ChatProvider';
import { IGroup } from '../Chat/ChatDisplay';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  width: { xs: "300px", sm: "500px", lg: "650px" },
};

interface ICreateGroupProps {
  open: boolean;
  handleClose(): void;
  onSubmitEffect: () => void;
}

export interface IUser {
  name: string;
  email: string;
  avatar: string;
  _id: string;
  token?: string;
}

interface IUserResponse {
  users: IUser[];
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

  const changeUserIdHandler = (
    e: React.SyntheticEvent<Element, Event>,
    users: IUser[]
  ) => {
    setInput({
      ...input,
      admin: user?._id,
      participants: [...users.map((user) => user._id)],
    });
  };

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <Modal open={props.open} onClose={props.handleClose}>
      <Paper sx={style} elevation={6} component="form" onSubmit={submitHandler}>
        <Typography variant="h6" component="h2">
          Create Modal
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          variant="outlined"
          label="Group Name"
          onChange={(e) => {
            setInput({
              ...input,
              name: e.target.value,
            });
          }}
        />
        <ParticipantsField
          onChangeUserIdHandler={changeUserIdHandler}
          token={user?.token || "not ticket"}
        />
        <Fab color="primary" type="submit" aria-label="add">
          <AddIcon />
        </Fab>
      </Paper>
    </Modal>
  );
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface ParticipantsFieldProps {
  onChangeUserIdHandler(
    e: React.SyntheticEvent<Element, Event>,
    users: IUser[]
  ): void;
  token: string;
}

/**
 * @desc Make an API request to the server and get back all users according to the user input
 * @params onChangeUserIdHandler(e: React.SyntheticEvent<Element, Event>, users:IUser[]): void;
 * @params token: string
 */
const ParticipantsField = (props: ParticipantsFieldProps) => {
  const [users, setUsers] = useState([
    {
      name: "",
      email: "",
      avatar: "",
      _id: "",
    },
  ]);
  const [input, setInput] = useState("");

  // Get all the users that match userInput
  const getUsers = async (userInput: string) => {
    const requestConfig = {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    };
    try {
      const { data } = await axios.get<IUserResponse>(
        `http://localhost:8080/api/v1/user?search=${userInput}`,
        requestConfig
      );
      setUsers(data.users);
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getUsers(input);
  }, [input]);

  return (
    <Autocomplete
      multiple
      options={users}
      disableCloseOnSelect
      isOptionEqualToValue={(option, value) => option._id === value._id}
      onChange={props.onChangeUserIdHandler}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          margin="normal"
          {...params}
          label="Participants"
          placeholder="Participants"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      )}
    />
  );
};

export default CreateGroup;
