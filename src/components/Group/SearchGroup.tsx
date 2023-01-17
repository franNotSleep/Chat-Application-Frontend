import Diversity3Icon from '@mui/icons-material/Diversity3';
import Search from '@mui/icons-material/Search';
import { Autocomplete, Box, Button, InputAdornment, Modal, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { IGroup } from '../Chat/ChatDisplay';

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ISearchGroupProps {
  open: boolean;
  handleClose(): void;
  onChangeSearch: (
    e: React.SyntheticEvent<Element, Event>,
    value: IGroup
  ) => void;
  onSubmitHandler(e: React.ChangeEvent<HTMLFormElement>): void;
}

interface IGroupResponse {
  group: IGroup[];
}

const SearchGroup = (props: ISearchGroupProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [group, setGroup] = useState<IGroup>();

  const isToken = (): string | void => {
    try {
      const token = JSON.parse(localStorage.getItem("user") || "").token;
      return token;
    } catch (error) {
      navigate("/");
    }
  };

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      let token: string | void = isToken();
      const { data } = await axios.get<IGroupResponse>(
        `http://localhost:8080/api/v1/group?search=${e.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGroups(data.group);
      setSearch(e.target.value);
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {sx: 200, md: 300, lg: 400},
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
        component="form"
        onSubmit={props.onSubmitHandler}
      >
        <Autocomplete
          isOptionEqualToValue={(option, value) => option._id === value._id}
          disableClearable
          getOptionLabel={(option) => option.name}
          onChange={props.onChangeSearch}
          options={groups}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search group"
              onChange={changeHandler}
              name="Search Group"
              variant="standard"
              InputProps={{
                ...params.InputProps,
                type: "search",
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Button variant="text" type="submit" endIcon={<Diversity3Icon />}>
          JOIN
        </Button>
      </Box>
    </Modal>
  );
};

export default SearchGroup;
