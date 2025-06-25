import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Stack,
  Typography,
  Slider,
  Autocomplete,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimeField,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import type { MigraineEntry } from "../interfaces/migraineEntry";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

const MainPage = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs());
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs());
  const [isOngoing, setIsOngoing] = useState(false);
  const [painIntensity, setPainIntensity] = useState<number>(5);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [medication, setMedication] = useState<string[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    const migraineData: MigraineEntry = {
      date: date?.format() || "",
      startTime: startTime?.format() || "",
      endTime: isOngoing ? "Ongoing" : endTime?.format() || "",
      painIntensity,
      triggers,
      medication,
      symptoms,
      notes,
    };
    console.log("Migraine Log:", migraineData);
    handleClose();
  };

  return (
    <>
      <h1>Migraine Tracker</h1>
      <Typography>Hi Vlada!</Typography>
      <Typography> Add your migraine episode </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={2} padding={2}>
          <Button variant="contained" fullWidth onClick={handleOpen}>
            Log Migraine
          </Button>

          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Log a Migraine</DialogTitle>
            <DialogContent>
              <Stack spacing={2} mt={1}>
                <DatePicker
                  label="Date"
                  value={date}
                  onChange={setDate}
                  format="DD/MM/YYYY"
                />
                <TimeField
                  label="Start Time"
                  value={startTime}
                  onChange={setStartTime}
                  format="HH:mm"
                />
                {!isOngoing && (
                  <TimeField
                    label="End Time"
                    value={endTime}
                    onChange={setEndTime}
                    format="HH:mm"
                  />
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isOngoing}
                      onChange={(e) => setIsOngoing(e.target.checked)}
                    />
                  }
                  label="Still ongoing"
                />
                <Typography gutterBottom>Pain Intensity</Typography>
                <Slider
                  value={painIntensity}
                  onChange={(_, value) => setPainIntensity(value as number)}
                  aria-label="Pain Intensity"
                  valueLabelDisplay="on"
                  step={1}
                  marks
                  min={1}
                  max={10}
                />
                <Autocomplete
                  multiple
                  freeSolo
                  options={["stress", "lack of sleep"]}
                  value={triggers}
                  onChange={(_, newValue) => setTriggers(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Triggers" fullWidth />
                  )}
                />
                <Autocomplete
                  multiple
                  freeSolo
                  options={["paracetomol", "ibuprofen"]}
                  value={medication}
                  onChange={(_, newValue) => setMedication(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Medication" fullWidth />
                  )}
                />
                <Autocomplete
                  multiple
                  freeSolo
                  options={["headache", "nausea", "aura"]}
                  value={symptoms}
                  onChange={(_, newValue) => setSymptoms(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Symptoms" fullWidth />
                  )}
                />
                <TextField
                  label="Additional Info"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  multiline
                  rows={3}
                  fullWidth
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>
      </LocalizationProvider>
    </>
  );
};

export default MainPage;
