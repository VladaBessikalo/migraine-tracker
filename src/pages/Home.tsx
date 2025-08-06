import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import MigraineForm from "../components/MigraineForm";
import type { MigraineEntry } from "../interfaces/migraineEntry";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const MainPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMigraineSubmit = (data: MigraineEntry) => {
    console.log("Migraine Log:", data);
    // Here you would typically save the data to your backend or state management
  };

  return (
    <>
      <Typography>Hi {user?.displayName || user?.email}!</Typography>
      <Typography> Add your migraine episode </Typography>
      <Stack spacing={2} padding={2}>
        <Button variant="contained" fullWidth onClick={handleOpen}>
          Log Migraine
        </Button>

        <MigraineForm
          open={open}
          onClose={handleClose}
          onSubmit={handleMigraineSubmit}
        />
      </Stack>
    </>
  );
};

export default MainPage;
