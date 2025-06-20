import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Box } from "@mui/material";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

export default function Calendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        maxWidth="400px"
        margin="0 auto"
        p={2}
      >
        <StaticDatePicker defaultValue={dayjs(Date())} />
      </Box>
    </LocalizationProvider>
  );
}
