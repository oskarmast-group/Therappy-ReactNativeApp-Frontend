import Conversation, { BaseConversation } from "../types/Conversation";
import api from "./api";

export const getAllConversations = async (): Promise<Conversation[]> => {
  const response = await api.get<Conversation[]>("/conversations");
  return response.data;
};

export const viewConversation = async (
  id: string
): Promise<BaseConversation> => {
  const response = await api.get<BaseConversation>(`${"/conversations"}/${id}`);
  return response.data;
};
