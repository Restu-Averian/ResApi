"use client";

import dynamic from "next/dynamic";
import Loading from "../lib/Loading";

const ContentDocs = dynamic(() => import("@/app/lib/ContentDocs"), {
  ssr: false,
  loading: () => <Loading />,
});
const LofiAlbum = () => {
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
      baseUrl="https://ppcp-api-scrape.vercel.app/api"
      description="Api untuk generate pp couple"
      title="PP Couple"
      tableData={queryData}
    />
  );
};
export default LofiAlbum;
