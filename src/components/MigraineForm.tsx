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
import { useMigraines } from "../hooks/useMigraines";

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

  const { addMigraineEntry, loading: saving, error } = useMigraines();

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

  const handleSubmit = async () => {
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

    try {
      await addMigraineEntry(migraineData);
      onSubmit(migraineData);
      handleClose();
    } catch (err) {
      console.error("Failed to save migraine entry:", err); // add an error message to the user
    }
  };

  const handleOngoingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOngoing(e.target.checked);
  };

  const handlePainIntensity = (_: any, newValue: number) => {
    setPainIntensity(newValue);
  };

  const handleTriggers = (_: any, newValue: string[]) => {
    setTriggers(newValue);
  };

  const handleMedication = (_: any, newValue: string[]) => {
    setMedication(newValue);
  };

  const handleSymptoms = (_: any, newValue: string[]) => {
    setSymptoms(newValue);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value);
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
                <Checkbox checked={isOngoing} onChange={handleOngoingChange} />
              }
              label="Still ongoing"
            />
            <Typography gutterBottom>Pain Intensity</Typography>
            <Slider
              value={painIntensity}
              onChange={handlePainIntensity}
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
              onChange={handleTriggers}
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
              onChange={handleMedication}
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
              onChange={handleSymptoms}
              renderInput={(params) => (
                <TextField {...params} label="Symptoms" fullWidth />
              )}
            />
            <TextField
              label="Additional Info"
              value={notes}
              onChange={handleNotesChange}
              multiline
              rows={3}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
        {error && (
          <Typography color="error" sx={{ p: 2 }}>
            Error: {error}
          </Typography>
        )}
      </Dialog>
    </LocalizationProvider>
  );
};

export default MigraineForm;
