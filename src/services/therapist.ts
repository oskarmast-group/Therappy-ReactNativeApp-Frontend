import { AxiosResponse } from "axios";
import Therapist, { BaseTherapist } from "../types/Therapist";
import api from "./api";
import UpdateTherapistFields from "../types/User/UpdateTherapistFields";

export const getAllTherapists = async (): Promise<BaseTherapist[]> => {
  const response = await api.get<BaseTherapist[]>("/therapist");
  return response.data;
};

export const getTherapist = async (id: number): Promise<Therapist> => {
  const response = await api.get<Therapist>(`${"/therapist"}/${id}`);
  return response.data;
};

export const updateTherapist = async (
  data: UpdateTherapistFields
): Promise<{ message: string }> => {
  const response = await api.patch<
    { message: string },
    AxiosResponse<{ message: string }, any>,
    UpdateTherapistFields
  >("/therapist", data);
  return response.data;
};
