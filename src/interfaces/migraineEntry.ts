
export interface MigraineEntry {
    date: string;
    startTime: string;
    endTime: string | "Ongoing";
    trigger: string; 
    medication: string;
    symptoms: string;
    notes: string;
}