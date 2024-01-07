"use client";

import React, { ReactNode } from "react";
import { Box, Stack } from "@chakra-ui/react";
import Sider from "../components/layout/Sider";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Stack direction="row" position="relative" bg="#F8F8F8">
      <Sider />
      <Box width="100%" margin="24px 16px">
        {children}
      </Box>
    </Stack>
  );
};
export default Layout;
