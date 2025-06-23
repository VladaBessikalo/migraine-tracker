
export interface MigraineEntry {
    date: string;
    startTime: string;
    endTime: string | "Ongoing";
    trigger: string; // or make a list of options - interface
    medication: string; // or make a list of options - interface
    symptoms: string; // or make a list of options - interface
    notes: string;
}