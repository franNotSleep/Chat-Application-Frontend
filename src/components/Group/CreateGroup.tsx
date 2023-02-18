import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Autocomplete, Box, Button, Checkbox } from "@mui/material";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";

import { ChatState, IGroup, IUser } from "../../Context/ChatProvider";
import { SearchBox } from "./SearchGroupBar";

interface IUserResponse {
  users: IUser[];
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

/**
 * @Note add filtering users
 */
const CreateGroup = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [participants, setParticipants] = useState<IUser[]>([]);
  const { user, setSelectedGroup, setValue } = ChatState();

  const submitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newGroupInput = { name, admin: user?._id, participants };

    try {
      const { data } = await axios.post<IGroup>(
        "http://localhost:8080/api/v1/group/",
        newGroupInput,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setSelectedGroup(data);
      setValue(0);
    } catch (error: any) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get<IUserResponse>(
        `http://localhost:8080/api/v1/user?search=`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setUsers(data.users);
    })();
  }, []);

  return (
    <Box
      component="form"
      onSubmit={submitHandler}
      sx={{
        height: "100%",
      }}
    >
      {/* ========== START INPUT FIELD ============ */}
      <SearchBox
        margin="normal"
        fullWidth
        variant="outlined"
        placeholder="Group Name"
        inputProps={{ "aria-label": "search" }}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {/* ========== END INPUT FIELD ============ */}

      <Autocomplete
        multiple
        options={users}
        disableCloseOnSelect
        onChange={(event, users) => {
          setParticipants(users);
        }}
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
          <SearchBox
            {...params}
            label="Participants"
            fullWidth
            placeholder="Participants"
            margin="normal"
          />
        )}
      />
      <Button
        variant="contained"
        size="large"
        type="submit"
        sx={{ margin: "auto", width: "100%" }}
      >
        Create
      </Button>
    </Box>
  );
};

export default CreateGroup;
