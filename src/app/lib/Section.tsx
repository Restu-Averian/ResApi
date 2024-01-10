import { Box, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

const Section = ({
  children,
  spacing,
}: {
  children: ReactNode;
  spacing?: number;
}) => {
  return (
    <Box>
      <Stack spacing={spacing || 2}>{children}</Stack>
    </Box>
  );
};
export default Section;
