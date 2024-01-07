"use client";
import { useState } from "react";
import HighlightLink from "@/app/lib/HighlightLink";
import axios from "axios";
import dynamic from "next/dynamic";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import Table from "rc-table";
import "../../style/table.scss";
import ModalResApi from "@/app/lib/ModalResApi";
import Section from "@/app/lib/Section";

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
    <Stack spacing={10}>
      <Section>
        <Heading>Search</Heading>
        <Text>Api untuk search yt dan juga nonton</Text>
      </Section>
      <Section>
        <Heading as="h3" fontSize="xl">
          Base URL
        </Heading>
        <Text>
          <HighlightLink text="https://yt-api-scrape.vercel.app/api/yt_list" />
        </Text>
      </Section>
      <Section>
        <Heading as="h3" fontSize="xl">
          Query
        </Heading>
        <Text>
          <HighlightLink text="https://yt-api-scrape.vercel.app/api/yt_list?search_query=rikiki%20kun&lang=en&type=video" />
        </Text>
        <Table data={queryData}>
          <Table.Column
            title="Parameter"
            dataIndex="parameter"
            key="parameter"
          />
          <Table.Column title="Type" dataIndex="type" key="type" />
          <Table.Column
            title="Description"
            dataIndex="description"
            key="description"
          />
          <Table.Column title="Required" dataIndex="required" key="required" />
          <Table.Column title="Default" dataIndex="default" key="default" />
        </Table>
      </Section>

      <Section>
        <Button
          colorScheme="blue"
          isLoading={state?.["dataQuery"]?.isLoading}
          onClick={() => {
            getData(
              "https://yt-api-scrape.vercel.app/api/yt_list?search_query=rikiki%20kun&lang=en&type=video",
              "dataQuery"
            );
          }}
        >
          Test Request
        </Button>
      </Section>

      <ModalResApi
        isOpen={state?.["dataQuery"]?.visibleModal}
        onClose={() => {
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
      </ModalResApi>
    </Stack>
  );
};
export default Youtube;
