import { Box, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

const Section = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <Stack spacing={2}>{children}</Stack>
    </Box>
  );
};
export default Section;
