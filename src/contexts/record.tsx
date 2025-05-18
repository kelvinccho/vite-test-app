import React, { createContext, useContext, useState, useEffect } from 'react';
import { getData, storeData } from '../helpers/storageHelper';
import type { TravelRecord } from '../types';

// Define the context type
interface RecordContextType {
  records: TravelRecord[];
  addRecord: (record: TravelRecord) => void;
  updateRecord: (index: number, updatedRecord: TravelRecord) => void;
  deleteRecord: (index: number) => void;
}

// Create the context
const RecordContext = createContext<RecordContextType | undefined>(undefined);

// Define the provider component
export const RecordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [records, setRecords] = useState<TravelRecord[]>([]);

  useEffect(() => {
    // Fetch records from localStorage on mount
    const storedRecords = getData('travelRecords') as TravelRecord[];
    if (storedRecords) {
      setRecords(storedRecords);
    }
  }, []);

  const addRecord = (record: TravelRecord) => {
    const updatedRecords = [...records, record];
    setRecords(updatedRecords);
    storeData('travelRecords', updatedRecords);
  };

  const updateRecord = (index: number, updatedRecord: TravelRecord) => {
    const updatedRecords = [...records];
    updatedRecords[index] = updatedRecord;
    setRecords(updatedRecords);
    storeData('travelRecords', updatedRecords);
  };

  const deleteRecord = (index: number) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
    storeData('travelRecords', updatedRecords);
  };

  return (
    <RecordContext.Provider value={{ records, addRecord, updateRecord, deleteRecord }}>
      {children}
    </RecordContext.Provider>
  );
};

// Custom hook to use the RecordContext
export const useRecordContext = () => {
  const context = useContext(RecordContext);
  if (!context) {
    throw new Error('useRecordContext must be used within a RecordProvider');
  }
  return context;
};
