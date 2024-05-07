import React, { useMemo } from 'react';
import Message, { TextMessage } from '../../../../../../interfaces/Conversation/Message';
import { Container, TextContainer, TextContent, TimeContainer, TimeContent } from './styles';
import useUser from '../../../../../../state/user';
import useMessages from '../../../../../../state/messages';
import { getDisplayTime } from '../../../../../../utils/time';

const TextMessageComponent: React.FC<{
  message: TextMessage;
  nextMessage: Message;
}> = ({ message, nextMessage }) => {
  const { data: userState } = useUser();
  const { data: messagesStates } = useMessages();
  const isSelf = useMemo(() => userState.current?.id === message.from.id, [userState, message]);
  const isLoading = useMemo(
    () => messagesStates.fetching.sendMessage?.config?.uuid === message.uuid,
    [messagesStates.fetching.sendMessage, message],
  );
  const lastInLine = useMemo(() => nextMessage?.from?.id !== message.from.id, [nextMessage, message.from]);

  return (
    <Container other={!isSelf} loading={isLoading} last={lastInLine}>
      <TextContainer>
        <TextContent other={!isSelf}>{message.payload.message}</TextContent>
      </TextContainer>
      <TimeContainer>
        <TimeContent other={!isSelf}>{getDisplayTime(new Date(message.createdAt))}</TimeContent>
      </TimeContainer>
    </Container>
  );
};

export default TextMessageComponent;
