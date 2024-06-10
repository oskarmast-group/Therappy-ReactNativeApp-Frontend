import React, { useEffect } from "react";
import { BaseText } from "../../../../components/Text";
import { PRIMARY_GREEN } from "../../../../resources/constants/colors";
import Loading from "../../../../components/Loading";
import UserType from "../../../../interfaces/User/UserType";
import ConversationsList from "./components/ConversationList";
import Scrollable from "../../../../components/containers/Scrollable";
import { useConversation } from "../../../../context/Conversations";
import { useAuth } from "../../../../context/Auth";

const Messages: React.FC = () => {
  const { user } = useAuth();
  const { conversations, getAllConversations, loadingAll } = useConversation();

  useEffect(() => {
    getAllConversations();
  }, []);

  return (
    <Scrollable>
      <BaseText
        fontSize={30}
        weight={600}
        color={PRIMARY_GREEN}
        textAlign={"center"}
        marginBottom={10}
      >
        Mensajes
      </BaseText>
      {loadingAll ? (
        <Loading />
      ) : conversations.length === 0 ? (
        <BaseText fontSize={12} marginTop={20}>
          {user?.userType === UserType.THERAPIST
            ? "Cuando te pongas en contacto con algún paciente tus mensajes aparecerán aquí"
            : "Cuando te pongas en contacto con algún especialista tus mensajes aparecerán aquí"}
        </BaseText>
      ) : (
        <ConversationsList list={conversations} />
      )}
    </Scrollable>
  );
};

export default Messages;
