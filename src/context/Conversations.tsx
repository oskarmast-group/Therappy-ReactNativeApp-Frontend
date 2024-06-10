import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Conversation, { BaseConversation } from "../types/Conversation";
import {
  getAllConversations,
  viewConversation,
} from "../services/conversations";
import { SocketMessage } from "../types/Conversation/Message";
import { useSocket } from "../Socket";

interface ConversationContextProps {
  conversations: Conversation[];
  getAllConversations: () => Promise<void>;
  viewConversation: (id: string) => Promise<BaseConversation | null>;
  loadingAll: boolean;
  loadingView: boolean;
}

const ConversationContext = createContext<ConversationContextProps | undefined>(
  undefined
);

export const ConversationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const socket = useSocket();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loadingAll, setLoadingAll] = useState(false);
  const [loadingView, setLoadingView] = useState(false);

  const handleGetAllConversations = async () => {
    setLoadingAll(true);
    try {
      const data = await getAllConversations();
      setConversations(data);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    } finally {
      setLoadingAll(false);
    }
  };

  const handleViewConversation = async (
    id: string
  ): Promise<BaseConversation | null> => {
    setLoadingView(true);
    try {
      const data = await viewConversation(id);
      return data;
    } catch (error) {
      console.error("Failed to fetch conversation:", error);
      return null;
    } finally {
      setLoadingView(false);
    }
  };

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("new message", (payload: SocketMessage) => {
      const conversation = conversations.find(
        ({ uuid }) => uuid === payload.conversationUUID
      );

      if (!conversation) {
        return;
      }

      const index = conversations.indexOf(conversation);
      if (index < 0) {
        return;
      }

      conversations[index] = {
        ...conversation,
        lastMessage: payload,
        unreadMessagesCount: (conversation.unreadMessagesCount ?? 0) + 1,
      };
    });

    return () => {
      socket.off("new message");
    };
  }, []);

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        getAllConversations: handleGetAllConversations,
        viewConversation: handleViewConversation,
        loadingAll,
        loadingView,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = (): ConversationContextProps => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversation must be used within a ConversationProvider"
    );
  }
  return context;
};
