import { useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { MigraineEntry } from "../interfaces/migraineEntry";

interface MigraineEntryWithId extends MigraineEntry {
  id: string;
  createdAt?: Timestamp;
}

export const useMigraines = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add a new migraine entry
  const addMigraineEntry = async (migraineData: MigraineEntry) => {
    if (!user?.uid) {
      setError("User not authenticated");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const userMigrainesRef = collection(
        db,
        "users",
        user.uid,
        "migraineEntries"
      );

      const entryWithTimestamp = {
        ...migraineData,
        createdAt: Timestamp.now(),
      };

      await addDoc(userMigrainesRef, entryWithTimestamp);
      console.log(
        "Migraine entry added successfully",
        userMigrainesRef,
        entryWithTimestamp
      ); // delete after checking
    } catch (err: any) {
      setError(err.message);
      console.error("Error adding migraine entry:", err); // delete after checking
    } finally {
      setLoading(false);
    }
  };

  // Get all migraine entries for the current user
  const getMigraineEntries = async (): Promise<MigraineEntryWithId[]> => {
    if (!user?.uid) {
      setError("User not authenticated");
      return [];
    }

    try {
      setLoading(true);
      setError(null);

      const userMigrainesRef = collection(
        db,
        "users",
        user.uid,
        "migraineEntries"
      );
      const q = query(userMigrainesRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const entries: MigraineEntryWithId[] = [];
      querySnapshot.forEach((doc) => {
        entries.push({
          id: doc.id,
          ...(doc.data() as MigraineEntry & { createdAt?: Timestamp }),
        });
      });

      return entries;
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching migraine entries:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Subscribe to real-time updates of migraine entries
  const subscribeMigraineEntries = (
    callback: (entries: MigraineEntryWithId[]) => void
  ) => {
    if (!user?.uid) {
      setError("User not authenticated");
      return () => {};
    }

    const userMigrainesRef = collection(
      db,
      "users",
      user.uid,
      "migraineEntries"
    );
    const q = query(userMigrainesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const entries: MigraineEntryWithId[] = [];
        querySnapshot.forEach((doc) => {
          entries.push({
            id: doc.id,
            ...(doc.data() as MigraineEntry & { createdAt?: Timestamp }),
          });
        });
        callback(entries);
      },
      (err) => {
        setError(err.message);
        console.error("Error in migraine entries subscription:", err);
      }
    );

    return unsubscribe;
  };

  // Update a migraine entry
  const updateMigraineEntry = async (
    entryId: string,
    updatedData: Partial<MigraineEntry>
  ) => {
    if (!user?.uid) {
      setError("User not authenticated");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const entryRef = doc(db, "users", user.uid, "migraineEntries", entryId);
      await updateDoc(entryRef, updatedData);
      console.log("Migraine entry updated successfully");
    } catch (err: any) {
      setError(err.message);
      console.error("Error updating migraine entry:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a migraine entry
  const deleteMigraineEntry = async (entryId: string) => {
    if (!user?.uid) {
      setError("User not authenticated");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const entryRef = doc(db, "users", user.uid, "migraineEntries", entryId);
      await deleteDoc(entryRef);
      console.log("Migraine entry deleted successfully");
    } catch (err: any) {
      setError(err.message);
      console.error("Error deleting migraine entry:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    addMigraineEntry,
    getMigraineEntries,
    subscribeMigraineEntries,
    updateMigraineEntry,
    deleteMigraineEntry,
    loading,
    error,
  };
};
