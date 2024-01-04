import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "./lib/AntdRegistry";
import Layout from "./lib/Layout";
import ConfigProvider from "./lib/ConfigProvider";
import "react-json-view-lite/dist/index.css";
import "./style/global.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <StyledComponentsRegistry> */}
        <ConfigProvider>
          <Layout>{children}</Layout>
        </ConfigProvider>
        {/* </StyledComponentsRegistry> */}
      </body>
    </html>
  );
}
