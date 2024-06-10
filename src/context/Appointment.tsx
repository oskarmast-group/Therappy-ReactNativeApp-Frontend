import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAllAppointments,
  getPendingAppointments,
  getUpcomingAppointments,
  reserveAppointment,
  confirmAppointment,
  acceptAppointment,
  rejectAppointment,
  cancelAppointment,
  viewAppointment,
  getServerTime,
  AcceptStartPayload,
  RejectStartPayload,
  CancelStartPayload,
} from "../services/appointment";
import Appointment, { BaseAppointment } from "../types/Appointment";

interface AppointmentContextProps {
  appointments: {
    list: BaseAppointment[];
    pendingList: BaseAppointment[];
    upcomingList: BaseAppointment[];
  };
  getAllAppointments: () => Promise<void>;
  getPendingAppointments: () => Promise<void>;
  getUpcomingAppointments: () => Promise<void>;
  reserveAppointment: (data: {
    therapistId: number;
    dateISO: string;
  }) => Promise<Appointment | null>;
  confirmAppointment: (data: {
    appointmentId: number;
    paymentMethodId?: string | null;
  }) => Promise<void>;
  acceptAppointment: (data: AcceptStartPayload) => Promise<void>;
  rejectAppointment: (data: RejectStartPayload) => Promise<void>;
  cancelAppointment: (data: CancelStartPayload) => Promise<void>;
  viewAppointment: (id: string) => Promise<Appointment | null>;
  getServerTime: () => Promise<{ now: number }>;
  loadingStates: {
    getAllAppointments: boolean;
    getPendingAppointments: boolean;
    getUpcomingAppointments: boolean;
    reserveAppointment: boolean;
    confirmAppointment: boolean;
    acceptAppointment: boolean;
    rejectAppointment: boolean;
    cancelAppointment: boolean;
    viewAppointment: boolean;
    getServerTime: boolean;
  };
}

const AppointmentContext = createContext<AppointmentContextProps | undefined>(
  undefined
);

export const AppointmentProvider: React.FC<{ children: any }> = ({
  children,
}) => {
  const [appointments, setAppointments] = useState<{
    list: BaseAppointment[];
    pendingList: BaseAppointment[];
    upcomingList: BaseAppointment[];
  }>({
    list: [],
    pendingList: [],
    upcomingList: [],
  });

  const [loadingStates, setLoadingStates] = useState({
    getAllAppointments: false,
    getPendingAppointments: false,
    getUpcomingAppointments: false,
    reserveAppointment: false,
    confirmAppointment: false,
    acceptAppointment: false,
    rejectAppointment: false,
    cancelAppointment: false,
    viewAppointment: false,
    getServerTime: false,
  });

  const handleGetAllAppointments = async () => {
    setLoadingStates((prev) => ({ ...prev, getAllAppointments: true }));
    try {
      const data = await getAllAppointments();
      setAppointments((prev) => ({ ...prev, list: data }));
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, getAllAppointments: false }));
    }
  };

  const handleGetPendingAppointments = async () => {
    setLoadingStates((prev) => ({ ...prev, getPendingAppointments: true }));
    try {
      const data = await getPendingAppointments();
      setAppointments((prev) => ({ ...prev, pendingList: data }));
    } catch (error) {
      console.error("Failed to fetch pending appointments:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, getPendingAppointments: false }));
    }
  };

  const handleGetUpcomingAppointments = async () => {
    setLoadingStates((prev) => ({ ...prev, getUpcomingAppointments: true }));
    try {
      const data = await getUpcomingAppointments();
      setAppointments((prev) => ({ ...prev, upcomingList: data }));
    } catch (error) {
      console.error("Failed to fetch upcoming appointments:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, getUpcomingAppointments: false }));
    }
  };

  const handleReserveAppointment = async (data: {
    therapistId: number;
    dateISO: string;
  }) => {
    setLoadingStates((prev) => ({ ...prev, reserveAppointment: true }));
    try {
      const res = await reserveAppointment(data);
      await handleGetAllAppointments();
      return res;
    } catch (error) {
      console.error("Failed to reserve appointment:", error);
      return null;
    } finally {
      setLoadingStates((prev) => ({ ...prev, reserveAppointment: false }));
    }
  };

  const handleConfirmAppointment = async (data: {
    appointmentId: number;
    paymentMethodId?: string | null;
  }) => {
    setLoadingStates((prev) => ({ ...prev, confirmAppointment: true }));
    try {
      await confirmAppointment(data);
      await handleGetAllAppointments();
    } catch (error) {
      console.error("Failed to confirm appointment:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, confirmAppointment: false }));
    }
  };

  const handleAcceptAppointment = async (data: AcceptStartPayload) => {
    setLoadingStates((prev) => ({ ...prev, acceptAppointment: true }));
    try {
      await acceptAppointment(data);
      await handleGetAllAppointments();
    } catch (error) {
      console.error("Failed to accept appointment:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, acceptAppointment: false }));
    }
  };

  const handleRejectAppointment = async (data: RejectStartPayload) => {
    setLoadingStates((prev) => ({ ...prev, rejectAppointment: true }));
    try {
      await rejectAppointment(data);
      await handleGetAllAppointments();
    } catch (error) {
      console.error("Failed to reject appointment:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, rejectAppointment: false }));
    }
  };

  const handleCancelAppointment = async (data: CancelStartPayload) => {
    setLoadingStates((prev) => ({ ...prev, cancelAppointment: true }));
    try {
      await cancelAppointment(data);
      await handleGetAllAppointments();
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, cancelAppointment: false }));
    }
  };

  const handleViewAppointment = async (
    id: string
  ): Promise<Appointment | null> => {
    setLoadingStates((prev) => ({ ...prev, viewAppointment: true }));
    try {
      const data = await viewAppointment(id);
      return data;
    } catch (error) {
      console.error("Failed to view appointment:", error);
      return null;
    } finally {
      setLoadingStates((prev) => ({ ...prev, viewAppointment: false }));
    }
  };

  const handleGetServerTime = async (): Promise<{ now: number }> => {
    setLoadingStates((prev) => ({ ...prev, getServerTime: true }));
    try {
      const data = await getServerTime();
      return data;
    } catch (error) {
      console.error("Failed to get server time:", error);
      throw error;
    } finally {
      setLoadingStates((prev) => ({ ...prev, getServerTime: false }));
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        getAllAppointments: handleGetAllAppointments,
        getPendingAppointments: handleGetPendingAppointments,
        getUpcomingAppointments: handleGetUpcomingAppointments,
        reserveAppointment: handleReserveAppointment,
        confirmAppointment: handleConfirmAppointment,
        acceptAppointment: handleAcceptAppointment,
        rejectAppointment: handleRejectAppointment,
        cancelAppointment: handleCancelAppointment,
        viewAppointment: handleViewAppointment,
        getServerTime: handleGetServerTime,
        loadingStates,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = (): AppointmentContextProps => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error(
      "useAppointment must be used within an AppointmentProvider"
    );
  }
  return context;
};
