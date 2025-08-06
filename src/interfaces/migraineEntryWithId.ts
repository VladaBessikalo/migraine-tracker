import { Timestamp } from "firebase/firestore";
import type { MigraineEntry } from "./migraineEntry";

export interface MigraineEntryWithId extends MigraineEntry {
  id: string;
  createdAt?: Timestamp;
}
