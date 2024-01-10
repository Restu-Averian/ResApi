"use client";
import Loading from "@/app/lib/Loading";
import dynamic from "next/dynamic";

const ContentDocs = dynamic(() => import("@/app/lib/ContentDocs"), {
  ssr: false,
  loading: () => <Loading />,
});
const YoutubeDetail = () => {
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
      baseUrl="https://yt-api-scrape.vercel.app/api/detail"
      description="Api untuk Detail yt dan juga nonton"
      title="Detail"
      tableData={queryData}
    />
  );
};
export default YoutubeDetail;
