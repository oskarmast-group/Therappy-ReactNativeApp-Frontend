import React, { createContext, useContext, useState, ReactNode } from "react";
import Therapist, { BaseTherapist } from "../types/Therapist";
import UpdateTherapistFields from "../types/User/UpdateTherapistFields";
import {
  getAllTherapists,
  getTherapist,
  updateTherapist,
} from "../services/therapist";

interface TherapistContextProps {
  therapists: BaseTherapist[];
  getAllTherapists: () => Promise<void>;
  getTherapist: (id: number) => Promise<Therapist | null>;
  updateTherapist: (data: UpdateTherapistFields) => Promise<void>;
  loadingAll: boolean;
  loadingOne: boolean;
  loadingUpdate: boolean;
}

const TherapistContext = createContext<TherapistContextProps | undefined>(
  undefined
);

export const TherapistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [therapists, setTherapists] = useState<BaseTherapist[]>([]);
  const [loadingAll, setLoadingAll] = useState(false);
  const [loadingOne, setLoadingOne] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const handleGetAllTherapists = async () => {
    setLoadingAll(true);
    try {
      const data = await getAllTherapists();
      setTherapists(data);
    } catch (error) {
      console.error("Failed to fetch therapists:", error);
    } finally {
      setLoadingAll(false);
    }
  };

  const handleGetTherapist = async (id: number): Promise<Therapist | null> => {
    setLoadingOne(true);
    try {
      const data = await getTherapist(id);
      return data;
    } catch (error) {
      console.error("Failed to fetch therapist:", error);
      return null;
    } finally {
      setLoadingOne(false);
    }
  };

  const handleUpdateTherapist = async (data: UpdateTherapistFields) => {
    setLoadingUpdate(true);
    try {
      await updateTherapist(data);
      await handleGetAllTherapists(); // Refresh list after update
    } catch (error) {
      console.error("Failed to update therapist:", error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <TherapistContext.Provider
      value={{
        therapists,
        getAllTherapists: handleGetAllTherapists,
        getTherapist: handleGetTherapist,
        updateTherapist: handleUpdateTherapist,
        loadingAll,
        loadingOne,
        loadingUpdate,
      }}
    >
      {children}
    </TherapistContext.Provider>
  );
};

export const useTherapist = (): TherapistContextProps => {
  const context = useContext(TherapistContext);
  if (!context) {
    throw new Error("useTherapist must be used within a TherapistProvider");
  }
  return context;
};
