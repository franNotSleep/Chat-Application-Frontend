import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

import { ChatState } from "../../Context/ChatProvider";

export const SearchBox = styled(TextField)(({ theme }) => ({
  "& fieldset": {
    borderRadius: "20px",
    marginRight: "40px",
  },
}));
/**
 *
 * @Nota completar el filtering
 */

const SearchGroupBar = () => {
  const [search, setSearch] = useState("");
  const { myGroups, setMyFilteredGroups } = ChatState();

  const changeSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterGroups = myGroups.filter((group) => {
      return group.name.toUpperCase().includes(e.target.value.toUpperCase());
    });
    setSearch(e.target.value);
    setMyFilteredGroups(filterGroups);
  };

  useEffect(() => {
    setMyFilteredGroups(myGroups);
  }, [myGroups]);

  return (
    <SearchBox
      margin="normal"
      fullWidth
      variant="outlined"
      placeholder="Search Group"
      inputProps={{ "aria-label": "search" }}
      value={search}
      onChange={changeSearchHandler}
    />
  );
};

export default SearchGroupBar;
