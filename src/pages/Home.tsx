import { Typography } from "@mui/material";
import Calendar from "../components/calendar";

export default function Home() {
  return (
    <>
      <h1>Migraine Tracker</h1>
      <>
        <Typography>Hi Vlada!</Typography>
        <Typography> Add your migraine episode </Typography>
        <Calendar />
      </>
    </>
  );
}
