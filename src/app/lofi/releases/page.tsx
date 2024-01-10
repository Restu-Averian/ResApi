"use client";

import Loading from "@/app/lib/Loading";
import dynamic from "next/dynamic";

const ContentDocs = dynamic(() => import("@/app/lib/ContentDocs"), {
  ssr: false,
  loading: () => <Loading />,
});
const LofiReleases = () => {
  const queryData = [
    {
      parameter: "search_query",
      type: "string",
      description: "Untuk mencari video yt",
      required: "Yes",
      default: "",
    },
    {
      parameter: "type",
      type: "any|video|channel|playlist|movie|live",
      description: "Untuk type video",
      required: "No",
      default: "any",
    },
    {
      parameter: "lang",
      type: "string",
      description: "Untuk bahasa di outputnya",
      required: "No",
      default: "en",
    },
  ];

  return (
    <ContentDocs
      baseUrl="https://lofi-api-scrape.vercel.app/api/releases?album=sunset"
      description="Api untuk denger music lofi"
      title="Releases"
      tableData={queryData}
    />
  );
};
export default LofiReleases;
