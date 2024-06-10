import LoginResponse from "../types/User/LoginResponse";
import * as SecureStore from "expo-secure-store";
import api from "./api";
import UpdateUserFields from "../types/User/UpdateUserFields";
import User from "../types/User";
import { AxiosResponse } from "axios";

export type AcceptInvitationStartPayload = {
  accept: boolean;
  invitationUUID: string;
};

export const loginService = async (data: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(`/auth/login`, data);
    await SecureStore.setItemAsync("authToken", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const registerService = async (data: {
  email: string;
  password: string;
  name: string;
  lastName: string;
  phone: string;
  userType: string;
  countryOrigin: string;
}): Promise<void> => {
  try {
    const response = await api.post(`/auth/register`, data);
    await SecureStore.setItemAsync("authToken", response.data.token);
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const requestEmailConfirmationService = async (): Promise<{
  message: string;
}> => {
  try {
    const response = await api.post<{ message: string }>(
      `/auth/request-confirmation-email`,
      {}
    );
    return response.data;
  } catch (error) {
    console.error("Request email confirmation failed:", error);
    throw error;
  }
};

export const requestPasswordRecoveryService = async (data: {
  email: string;
}): Promise<void> => {
  try {
    await api.post(`/auth/request-password-recovery`, data);
  } catch (error) {
    console.error("Request password recovery failed:", error);
    throw error;
  }
};

export const passwordRecoveryService = async (data: {
  password: string;
  token: string;
}): Promise<void> => {
  try {
    await api.post(`/auth/new-password`, data);
  } catch (error) {
    console.error("Password recovery failed:", error);
    throw error;
  }
};

export const getProfileService = async (): Promise<User> => {
  try {
    const response = await api.get<User>(`/profile`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
};

export const updateUserService = async (
  data: UpdateUserFields
): Promise<{ message: string }> => {
  try {
    const response = await api.patch<
      { message: string },
      AxiosResponse<{ message: string }, any>,
      UpdateUserFields
    >(`/profile`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
};

export const respondToAssignmentService = async (
  data: AcceptInvitationStartPayload
): Promise<{ accepted: boolean }> => {
  try {
    const response = await api.post<{ accepted: boolean }>(
      `/profile/assignment-response`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Failed to respond to assignment:", error);
    throw error;
  }
};
