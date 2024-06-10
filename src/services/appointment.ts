import Axios from "axios";
import * as SecureStore from "expo-secure-store";
import Appointment, { BaseAppointment } from "../types/Appointment";
import api from "./api";

export type RejectStartPayload = {
  appointmentId: number;
  roomId?: string | null;
};

export type AcceptStartPayload = {
  appointmentId: number;
  roomId?: string | null;
};

export type CancelStartPayload = {
  roomId: string;
};

export const getAllAppointments = async (): Promise<BaseAppointment[]> => {
  const response = await api.get<BaseAppointment[]>("/appointments");
  return response.data;
};

export const getPendingAppointments = async (): Promise<BaseAppointment[]> => {
  const response = await api.get<BaseAppointment[]>("/appointments/pending");

  return response.data;
};

export const getUpcomingAppointments = async (): Promise<BaseAppointment[]> => {
  const response = await api.get<BaseAppointment[]>("/appointments/upcoming");
  return response.data;
};

export const reserveAppointment = async (data: {
  therapistId: number;
  dateISO: string;
}): Promise<Appointment> => {
  const response = await api.post("/appointments/reserve", data);
  return response.data.appointment;
};

export const confirmAppointment = async (data: {
  appointmentId: number;
  paymentMethodId?: string | null;
}): Promise<Appointment> => {
  const response = await api.post<Appointment>("/appointments/confirm", data);
  return response.data;
};

export const acceptAppointment = async (
  data: AcceptStartPayload
): Promise<Appointment> => {
  const response = await api.post<Appointment>("/appointments/accept", data);
  return response.data;
};

export const rejectAppointment = async (
  data: RejectStartPayload
): Promise<Appointment> => {
  const response = await api.post<Appointment>("/appointments/reject", data);
  return response.data;
};

export const cancelAppointment = async (
  data: CancelStartPayload
): Promise<Appointment> => {
  const response = await api.post<Appointment>("/appointments/cancel", data);
  return response.data;
};

export const viewAppointment = async (id: string): Promise<Appointment> => {
  const response = await api.get<Appointment>(`/appointments/${id}`);
  return response.data;
};

export const getServerTime = async (): Promise<{ now: number }> => {
  const response = await api.get<{ now: number }>("/appointments/time-now");
  return response.data;
};
