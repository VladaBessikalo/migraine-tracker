import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <Box
      sx={{
        mt: 8, // Handle header spacing here
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
};

export default PageWrapper;
