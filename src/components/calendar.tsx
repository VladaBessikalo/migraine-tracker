import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

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
        maxWidth="400px"
        margin="0 auto"
        p={2}
      >
          <MobileDatePicker defaultValue={dayjs()} format="DD/MM/YYYY" />
      </Box>
    </LocalizationProvider>
  );
}
