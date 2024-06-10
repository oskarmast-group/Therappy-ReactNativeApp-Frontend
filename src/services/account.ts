import { AccountInformation } from "../interfaces/User";
import api from "./api";

export const getAccountInformation = () =>
  api.get<AccountInformation>(`/stripe-therapist/account-information`);

export const getAccountLink = () =>
  api.get<{ url: string }>(`/stripe-therapist/account-link`);

export const getSetupIntent = () =>
  api.get(`/stripe-clients/stripe-clients/payment-sheet`);

export const getPaymentMethods = () =>
  api.get(`/stripe-clients/payment-methods`);

export const deletePaymentMethod = (data: any) =>
  api.post(`/stripe-clients/delete-payment-method`, data);
