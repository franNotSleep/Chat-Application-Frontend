import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer } from '@mui/material';
import React, { useState } from 'react';

import { ChatState } from '../Context/ChatProvider';

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

type DrawerWrapperProps = {
  children: React.ReactNode;
  anchor?: Anchor;
};

type Anchor = "top" | "left" | "bottom" | "right";

const DrawerWrapper = (props: DrawerWrapperProps) => {
  const { openDrawer, setOpenDrawer } = ChatState();

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
    <Drawer
      anchor={props.anchor ?? "left"}
      open={openDrawer}
      onClose={toggleDrawer(false)}
    >
      {props.anchor != "bottom" && (
        <CloseIcon
          onClick={() => {
            setOpenDrawer(false);
          }}
          sx={{
            width: 1 / 1,
            background: "linear-gradient(to top, #2193b0, #6dd5ed)",
            color: "#fff",
            cursor: "pointer",
          }}
        />
      )}

      <Box
        sx={{
          width: "100%",
          background: "linear-gradient(to top, #2193b0, #6dd5ed)",
          height: "100%",
          minWidth: "300px",
        }}
      >
        {props.children}
      </Box>
    </Drawer>
  );
};

export default DrawerWrapper;
