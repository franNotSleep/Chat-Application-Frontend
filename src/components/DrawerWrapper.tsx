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
    <React.Fragment>
      <Drawer anchor={"left"} open={openDrawer} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: { xs: 240, sm: 400, md: 500 },
            background: "linear-gradient(to top, #2193b0, #6dd5ed)",
            height: "100%",
          }}
        >
          {props.children}
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default DrawerWrapper;
