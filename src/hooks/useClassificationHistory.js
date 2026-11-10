import { useState, useCallback, useEffect } from "react";
import {
  getHistory,
  addToHistory,
  setDisposedStatus,
  setPredictionVerification,
  deleteHistoryEntry,
  getStats,
  clearAllData,
} from "../utils/storage";

const STORAGE_EVENT = "ecovision:history-updated";

function notifyUpdate() {
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
}

/**
 * Custom hook to manage local classification history and live dashboard statistics.
 */
export default function useClassificationHistory() {
  const [history, setHistory] = useState(() => getHistory());
  const [stats, setStats] = useState(() => getStats());

  const refreshData = useCallback(() => {
    const latest = getHistory();
    setHistory(latest);
    setStats(getStats(latest));
  }, []);

  useEffect(() => {
    const handler = () => refreshData();
    window.addEventListener(STORAGE_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(STORAGE_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, [refreshData]);

  const addEntry = useCallback(
    (entry) => {
      const newEntry = addToHistory(entry);
      refreshData();
      notifyUpdate();
      return newEntry;
    },
    [refreshData]
  );

  const toggleDisposed = useCallback(
    (id, nextState) => {
      setDisposedStatus(id, nextState);
      refreshData();
      notifyUpdate();
    },
    [refreshData]
  );

  const markDisposed = useCallback(
    (id) => {
      setDisposedStatus(id, true);
      refreshData();
      notifyUpdate();
    },
    [refreshData]
  );

  const verifyPrediction = useCallback(
    (id, isCorrect) => {
      setPredictionVerification(id, isCorrect);
      refreshData();
      notifyUpdate();
    },
    [refreshData]
  );

  const deleteEntry = useCallback(
    (id) => {
      deleteHistoryEntry(id);
      refreshData();
      notifyUpdate();
    },
    [refreshData]
  );

  const clearData = useCallback(() => {
    clearAllData();
    refreshData();
    notifyUpdate();
  }, [refreshData]);

  return {
    history,
    stats,
    addEntry,
    toggleDisposed,
    markDisposed,
    verifyPrediction,
    deleteEntry,
    refreshData,
    clearData,
  };
}
