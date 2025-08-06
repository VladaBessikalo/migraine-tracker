import type { MigraineEntry } from "./migraineEntry";

export interface MigraineFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: MigraineEntry) => void;
}
