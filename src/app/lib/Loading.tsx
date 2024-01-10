import { Box, Spinner } from "@chakra-ui/react";

const Loading = ({ isCenterEle = true }: { isCenterEle?: boolean }) => {
  return (
    <Box
      width="100%"
      textAlign="center"
      {...(isCenterEle && {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
};
export default Loading;
