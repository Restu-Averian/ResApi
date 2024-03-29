"use client";

import dynamic from "next/dynamic";
import Loading from "../lib/Loading";
import { tableDataProps } from "@/app/lib/ContentDocs";
import { Suspense } from "react";

const ContentDocs = dynamic(() => import("@/app/lib/ContentDocs"), {
  ssr: false,
  loading: () => <Loading />,
});
const PPCP = () => {
  const queryData: tableDataProps[] = [
    {
      parameter: "num",
      type: "number",
      description: "just random the number while requesting this api",
      required: "No",
      default: "",
    },
  ];

  return (
    <Suspense>
      <ContentDocs
        baseUrl="https://ppcp-api-scrape.vercel.app/api?num=1"
        description="Api untuk generate pp couple"
        title="PP Couple"
        tableData={queryData}
      />
    </Suspense>
  );
};
export default PPCP;
