import React, {useMemo} from 'react';
import {Text} from 'react-native';
import styles from './styles';
import Message from '../../../../../interfaces/Conversation/Message';
import MessageType from '../../../../../interfaces/Conversation/MessageType';
import {InView} from 'react-native-intersection-observer';
import {BaseText} from '../../../../../components/Text';
import {getDisplayDate} from '../../../../../utils/date';
import TextMessage from './Text';
import AssignmentMessage from './Assignment';

const MessageComponent: React.FC<{
  message: Message;
  previousMessage: Message | null;
  nextMessage: Message;
  onVisible: (message: Message) => void;
  firstUnread: string | null;
}> = ({
  message,
  previousMessage,
  nextMessage,
  onVisible = () => {},
  firstUnread,
}) => {
  const shouldShowDate = useMemo(() => {
    if (!previousMessage) {
      return true;
    }
    const date = new Date(message.createdAt);
    const previousDate = new Date(previousMessage.createdAt);
    if (date.getDay() > previousDate.getDay()) {
      return true;
    }
    return false;
  }, [message, previousMessage]);

  return (
    <InView
      triggerOnce={true}
      onChange={inView => {
        if (inView) {
          onVisible(message);
        }
      }}
      style={styles.container}>
      {shouldShowDate && (
        <BaseText
          textAlign={'center'}
          marginBottom={5}
          marginTop={5}
          marginRight={5}
          marginLeft={5}
          fontSize={17}
          flexShrink={1}>
          {getDisplayDate(message.createdAt, 'MMMM d, yyyy')}
        </BaseText>
      )}
      {message.uuid === firstUnread && (
        <Text style={styles.newMessageHeader}>Nuevos mensajes</Text>
      )}
      {message.type === MessageType.TEXT && (
        <TextMessage message={message} nextMessage={nextMessage} />
      )}
      {message.type === MessageType.ASSIGNMENT && (
        <AssignmentMessage message={message} />
      )}
    </InView>
  );
};

export default MessageComponent;
