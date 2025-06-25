
export interface MigraineEntry {
    date: string;
    startTime: string;
    endTime: string | "Ongoing";
    painIntensity: number;
    trigger: string; 
    medication: string;
    symptoms: string;
    notes: string;
}