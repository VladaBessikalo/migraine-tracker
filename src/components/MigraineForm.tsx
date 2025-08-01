import { useState } from "react";
import {
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
  Button,
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

interface MigraineFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: MigraineEntry) => void;
}

const MigraineForm = ({ open, onClose, onSubmit }: MigraineFormProps) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs());
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs());
  const [isOngoing, setIsOngoing] = useState(false);
  const [painIntensity, setPainIntensity] = useState<number>(5);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [medication, setMedication] = useState<string[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const resetForm = () => {
    setDate(dayjs());
    setStartTime(dayjs());
    setEndTime(dayjs());
    setIsOngoing(false);
    setPainIntensity(5);
    setTriggers([]);
    setMedication([]);
    setSymptoms([]);
    setNotes("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

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
    onSubmit(migraineData);
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              options={[
                "stress",
                "lack of sleep",
                "weather changes",
                "hormonal changes",
                "certain foods",
                "bright lights",
              ]}
              value={triggers}
              onChange={(_, newValue) => setTriggers(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Triggers" fullWidth />
              )}
            />
            <Autocomplete
              multiple
              freeSolo
              options={[
                "paracetamol",
                "ibuprofen",
                "aspirin",
                "sumatriptan",
                "naproxen",
              ]}
              value={medication}
              onChange={(_, newValue) => setMedication(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Medication" fullWidth />
              )}
            />
            <Autocomplete
              multiple
              freeSolo
              options={[
                "headache",
                "nausea",
                "aura",
                "sensitivity to light",
                "sensitivity to sound",
                "vomiting",
              ]}
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
    </LocalizationProvider>
  );
};

export default MigraineForm;
