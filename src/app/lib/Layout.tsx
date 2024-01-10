"use client";

import React, { ReactNode } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import Sider from "../components/layout/Sider";
import Link from "next/link";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Stack direction="row" position="relative" bg="#F8F8F8">
      <Sider />
      <Box width="100%" margin="24px 16px">
        <Box>{children}</Box>
        <Box position="fixed" bottom={5} left={"50%"}>
          <Text>
            Made by{" "}
            <Link
              style={{ fontWeight: "bold" }}
              href="https://www.restu-averian-putra.my.id/"
              target="_blank"
            >
              Restu
            </Link>
          </Text>
        </Box>
      </Box>
    </Stack>
  );
};
export default Layout;
