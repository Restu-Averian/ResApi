"use client";
import { Suspense, memo, useState } from "react";
import axios, { AxiosError } from "axios";
import dynamic from "next/dynamic";
import { Button, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import Table from "rc-table";
import ModalResApi from "@/app/lib/ModalResApi";
import Section from "@/app/lib/Section";
import "../style/table.scss";
import Loading from "./Loading";

const DynamicReactJson = dynamic(() => import("react-json-view"), {
  ssr: false,
});
const HighlightLink = dynamic(() => import("@/app/lib/HighlightLink"), {
  ssr: false,
  loading: () => <Loading isCenterEle={false} />,
});

export interface tableDataProps {
  parameter: string;
  type?: string;
  description: string;
  required: string;
  default?: string;
}
interface stateData {
  visibleModal: boolean;
  data?: any;
  isLoading: boolean;
}
interface ContentDocsProps {
  /**
   * Give title of the api page
   */
  title: string;
  /**
   * Short description about api
   */
  description: string;
  /**
   * base url for api that will be test of request
   */
  baseUrl: string;
  tableData: tableDataProps[];
}

const ContentDocs_ = ({
  title,
  description,
  baseUrl,
  tableData,
}: ContentDocsProps) => {
  const [state, setState] = useState<stateData>({
    visibleModal: false,
    data: {},
    isLoading: false,
  });

  const toast = useToast();

  const getData = async (url: string) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      const { data } = await axios.get(url);

      setState((prev) => ({
        ...prev,
        visibleModal: true,
        data,
      }));
    } catch (e: AxiosError | any) {
      toast({
        status: "error",
        title: e?.response?.data?.message,
      });
    } finally {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  return (
    <Stack spacing={10}>
      <Section>
        <Heading>{title}</Heading>
        <Text>{description}</Text>
      </Section>
      <Section>
        <Heading as="h3" fontSize="xl">
          Base URL
        </Heading>
        <Suspense fallback={<>Loading...</>}>
          <Text>
            <HighlightLink text={baseUrl} />
          </Text>
        </Suspense>
      </Section>

      <Section spacing={5}>
        <Table data={tableData} rowKey="description">
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
        <Button
          width="200px"
          colorScheme="blue"
          isLoading={state?.isLoading}
          onClick={() => {
            getData(baseUrl);
          }}
        >
          Test Request
        </Button>
      </Section>

      <ModalResApi
        isOpen={state?.visibleModal}
        onClose={() => {
          setState((prev) => ({
            ...prev,
            visibleModal: false,
          }));
        }}
      >
        {Object.keys(state?.data || "{}")?.length > 0 ? (
          <DynamicReactJson src={state?.data} theme="tomorrow" collapsed={1} />
        ) : (
          <></>
        )}
      </ModalResApi>
    </Stack>
  );
};

const ContentDocs = memo(ContentDocs_);
export default ContentDocs;
