import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, AutocompleteRenderOptionState } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import * as React from 'react';

import { IGroup, IUser } from '../../Context/ChatProvider';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#fff",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

interface GenericGetOptionLabel<T> {
  (option: T): string;
}

interface IStyledInputAutocomplete {
  options: IGroup[] | IUser[];
  placeholder: string;
  getOptionLabel: GenericGetOptionLabel<IGroup | IUser>;
  value: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeAutocompleteHandler?:
    | ((
        event: React.SyntheticEvent<Element, Event>,
        value: Array<IGroup | IUser> | IUser | IGroup | null
      ) => void)
    | undefined;
  multipleSelect?: boolean;
  renderOption:
    | ((
        props: React.HTMLAttributes<HTMLLIElement>,
        option: IGroup | IUser,
        state: AutocompleteRenderOptionState
      ) => React.ReactNode)
    | undefined;
  icon?: React.ReactNode;
}

const StyledInputAutocomplete = ({
  options,
  getOptionLabel,
  placeholder,
  value,
  changeHandler,
  changeAutocompleteHandler,
  renderOption,
  multipleSelect,
  icon,
}: IStyledInputAutocomplete) => {
  return (
    <Autocomplete
      multiple={multipleSelect ?? false}
      options={options}
      disableCloseOnSelect
      getOptionLabel={getOptionLabel}
      onChange={changeAutocompleteHandler}
      style={{ width: "100%" }}
      renderOption={renderOption}
      renderInput={(params) => {
        const { InputLabelProps, InputProps, ...rest } = params;
        return (
          <Search>
            <SearchIconWrapper>
              {icon ?? <SearchIcon sx={{ color: "#fff" }} />}
            </SearchIconWrapper>
            <StyledInputBase
              {...params.InputProps}
              {...rest}
              placeholder={placeholder}
              value={value}
              onChange={changeHandler}
            />
          </Search>
        );
      }}
    />
  );
};

export default StyledInputAutocomplete;
