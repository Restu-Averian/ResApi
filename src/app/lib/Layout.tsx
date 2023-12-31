"use client";

import { Layout as LayoutAntd } from "antd";
import React, { ReactNode } from "react";
import Sider from "../components/layout/Sider";

type LayoutProps = {
  children: ReactNode;
};

const { Content } = LayoutAntd;
const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutAntd hasSider>
      <Sider />
      {/* <LayoutAntd style={{ width: "100% !important" }}> */}
      <Content
        style={{
          width: "100%",
          margin: "24px 16px",
          overflow: "initial",
        }}
      >
        {children}
      </Content>
      {/* </LayoutAntd> */}
    </LayoutAntd>
  );
};
export default Layout;
