"use client";
import { useState } from "react";
import HighlightLink from "@/app/lib/HighlightLink";
import { Space, Typography, Table, Button, Modal } from "antd";
import axios from "axios";
import dynamic from "next/dynamic";

const DynamicReactJson = dynamic(() => import("react-json-view"), {
  ssr: false,
});

type StateShape = {
  [key: string]: {
    visibleModal: boolean;
    data?: any; // Sesuaikan dengan tipe data yang diharapkan
    isLoading: boolean;
  };
};
const Youtube = () => {
  const [state, setState] = useState<StateShape>({
    dataQuery: {
      visibleModal: false,
      data: {},
      isLoading: false,
    },
  });

  const getData = async (url: string, stateName: string | any) => {
    setState((prev) => ({
      ...prev,
      [stateName]: {
        isLoading: true,
      },
    }));

    const { data } = await axios.get(url);

    setState((prev) => ({
      ...prev,
      [stateName]: {
        ...state?.[stateName],
        visibleModal: true,
        data,
        isLoading: false,
      },
    }));
  };

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
    <Space direction="vertical" style={{ width: "100%" }}>
      <Typography.Title level={1} style={{ fontWeight: "bold" }}>
        Search
      </Typography.Title>
      <Typography.Paragraph>
        Api untuk search yt dan juga nonton
      </Typography.Paragraph>
      <Typography.Title level={2}>Base URL</Typography.Title>
      <Typography.Paragraph>
        <HighlightLink text="https://yt-api-scrape.vercel.app/api/yt_list" />
      </Typography.Paragraph>
      <Typography.Title level={2}>Query</Typography.Title>
      <Typography.Paragraph>
        <HighlightLink text="https://yt-api-scrape.vercel.app/api/yt_list?search_query=rikiki%20kun&lang=en&type=video" />
      </Typography.Paragraph>
      <Table dataSource={queryData} pagination={false}>
        <Table.Column title="Parameter" dataIndex="parameter" />
        <Table.Column title="Type" dataIndex="type" />
        <Table.Column title="Description" dataIndex="description" />
        <Table.Column title="Required" dataIndex="required" />
        <Table.Column title="Default" dataIndex="default" />
      </Table>
      <Button
        size="large"
        loading={state?.["dataQuery"]?.isLoading}
        onClick={() => {
          getData(
            "https://yt-api-scrape.vercel.app/api/yt_list?search_query=rikiki%20kun&lang=en&type=video",
            "dataQuery"
          );
        }}
      >
        Test Request
      </Button>

      <Modal
        width="100vw"
        style={{ height: "100vh" }}
        footer={false}
        open={state?.["dataQuery"]?.visibleModal}
        onCancel={() => {
          setState((prev) => ({
            ...prev,
            dataQuery: {
              ...state?.dataQuery,
              visibleModal: false,
            },
          }));
        }}
      >
        {Object.keys(state?.dataQuery?.data || "{}")?.length > 0 ? (
          <DynamicReactJson
            src={state?.dataQuery?.data}
            theme="tomorrow"
            collapsed={1}
          />
        ) : (
          <></>
        )}
      </Modal>
    </Space>
  );
};
export default Youtube;
