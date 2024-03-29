import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Layout from "./lib/Layout";
// import "react-json-view-lite/dist/index.css";
import "./style/global.scss";
import { ChakraProvider } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ResApi",
  description: "Free Rest Api",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <Layout>{children}</Layout>
        </ChakraProvider>
      </body>
    </html>
  );
}
