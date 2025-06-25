
export interface MigraineEntry {
    date: string;
    startTime: string;
    endTime: string | "Ongoing";
    painIntensity: number;
    triggers: string[]; 
    medication: string[];
    symptoms: string[];
    notes: string;
}