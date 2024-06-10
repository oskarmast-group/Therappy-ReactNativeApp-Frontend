// context/RequiredDocumentationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import RequiredDocumentation from "../types/Documentation/RequiredDocumentation";
import { getAllRequiredDocumentation } from "../services/requiredDocumentation";

interface RequiredDocumentationContextProps {
  requiredDocumentation: RequiredDocumentation[];
  getAllRequiredDocumentation: () => Promise<void>;
  loading: {
    getAllRequiredDocumentation: boolean;
  };
}

const RequiredDocumentationContext = createContext<
  RequiredDocumentationContextProps | undefined
>(undefined);

export const RequiredDocumentationProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [requiredDocumentation, setRequiredDocumentation] = useState<
    RequiredDocumentation[]
  >([]);
  const [loading, setLoading] = useState({
    getAllRequiredDocumentation: false,
  });

  const handleGetAllRequiredDocumentation = async () => {
    setLoading((prev) => ({ ...prev, getAllRequiredDocumentation: true }));
    try {
      const data = await getAllRequiredDocumentation();
      setRequiredDocumentation(data);
    } catch (error) {
      console.error("Failed to fetch required documentation:", error);
    } finally {
      setLoading((prev) => ({ ...prev, getAllRequiredDocumentation: false }));
    }
  };

  return (
    <RequiredDocumentationContext.Provider
      value={{
        requiredDocumentation,
        getAllRequiredDocumentation: handleGetAllRequiredDocumentation,
        loading,
      }}
    >
      {children}
    </RequiredDocumentationContext.Provider>
  );
};

export const useRequiredDocumentation =
  (): RequiredDocumentationContextProps => {
    const context = useContext(RequiredDocumentationContext);
    if (!context) {
      throw new Error(
        "useRequiredDocumentation must be used within a RequiredDocumentationProvider"
      );
    }
    return context;
  };
