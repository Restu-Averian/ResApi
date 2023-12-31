"use client";
import { useState } from "react";
import HighlightLink from "@/app/lib/HighlightLink";
import { Space, Typography, Table, Button, Spin, Modal } from "antd";
import axios from "axios";
import ReactJson from "react-json-view";

const Youtube = () => {
  const [state, setState] = useState({});

  const getData = async (url: string, stateName: string) => {
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
        visibleModal: true,
        data,
        isLoading: false,
      },
    }));
  };
  const pathData = [
    {
      parameter: "yt_list",
      type: "string",
      description: "Untuk menampilkan list  video yt",
      required: "Yes",
      default: "",
    },
  ];
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
      <Typography.Title level={2}>Path</Typography.Title>
      <Table dataSource={pathData} pagination={false}>
        <Table.Column title="Parameter" dataIndex="parameter" />
        <Table.Column title="Type" dataIndex="type" />
        <Table.Column title="Description" dataIndex="description" />
        <Table.Column title="Required" dataIndex="required" />
        <Table.Column title="Default" dataIndex="default" />
      </Table>
      <Button
        loading={state?.["dataPath"]?.isLoading}
        size="large"
        onClick={() => {
          getData("https://yt-api-scrape.vercel.app/api/yt_list", "dataPath");
        }}
      >
        Test Request
      </Button>

      <Modal
        width="100vw"
        style={{ height: "100vh" }}
        footer={false}
        open={state?.["dataPath"]?.visibleModal}
        onCancel={() => {
          setState((prev) => ({
            ...prev,
            dataPath: {
              ...state?.dataPath,
              visibleModal: false,
            },
          }));
        }}
      >
        <ReactJson
          src={state?.["dataPath"]?.data}
          theme="tomorrow"
          collapsed={1}
        />
      </Modal>
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
        <ReactJson
          src={state?.["dataQuery"]?.data}
          theme="tomorrow"
          collapsed={1}
        />
      </Modal>
    </Space>
  );
};
export default Youtube;
